# FitSpine Dashboard Calculations - Backend Implementation Guide

## Table of Contents
1. [Data Structure](#data-structure)
2. [Insights Tab Calculations](#insights-tab-calculations)
3. [Pain & Stiffness Tab Calculations](#pain--stiffness-tab-calculations)
4. [Activity Tab Calculations](#activity-tab-calculations)
5. [Heart Rate Tab Calculations](#heart-rate-tab-calculations)
6. [Sleep Tab Calculations](#sleep-tab-calculations)
7. [Common Utility Functions](#common-utility-functions)

---

## Data Structure

### WeeklyGraphDto
```json
{
  "dailyData": [DailyGraphDto],  // Array of 7 days
  "isFitbitConnected": boolean   // Whether Fitbit is connected
}
```

### DailyGraphDto
```json
{
  "date": "YYYY-MM-DD",                    // Date string
  
  // Enum-based fields (0-4 scale, -1 for null)
  "painLevel": 0-3 | null | -1,            // 0=None, 1=Mild, 2=Moderate, 3=Severe
  "morningStiffness": 0-3 | null | -1,     // 0=None, 1=Mild, 2=Moderate, 3=Severe
  "stressLevel": 0-4 | null | -1,          // 0=Very Low, 1=Low, 2=Moderate, 3=High, 4=Very High
  "standingTime": 0-4 | null | -1,         // 0=<2h, 1=2-4h, 2=4-6h, 3=6-8h, 4=>8h
  "sittingTime": 0-4 | null | -1,          // 0=<2h, 1=2-4h, 2=4-6h, 3=6-8h, 4=>8h
  "sleepDuration": 0-4 | null | -1,        // 0=<5h, 1=5-6h, 2=6-7h, 3=7-8h, 4=>8h (manual only)
  
  // Numeric fields
  "fitbitSedentaryHours": number | null,   // Hours (Fitbit only)
  "fitbitRestingHeartRate": number | null, // bpm (Fitbit only)
  "fitbitTotalMinutesAsleep": number | null, // Minutes (Fitbit only)
  "manualRestingHeartRate": number | null, // bpm (manual only)
  "nightWakeUps": number | null            // Count (manual only)
}
```

**Important Notes:**
- `null` and `-1` both represent missing data
- Enum fields use integer values (0-4)
- Fitbit fields are only populated when `isFitbitConnected = true`
- Manual fields are used when `isFitbitConnected = false`

---

## Insights Tab Calculations

The Insights tab provides a high-level weekly overview with 5 main sections.

### 1. Weekly Summary

**Function:** `generateWeeklySummary(dailyData)`

**Calculation Steps:**

1. **Compute Weekly Averages** (see `computeWeeklyAverages` below)
   - Get averages for: painLevel, morningStiffness, sittingTime, sedentaryHours

2. **Calculate Overall Spine Load**
   ```python
   spine_load_components = []
   if pain_avg is not None:
       spine_load_components.append(pain_avg)
   if stiffness_avg is not None:
       spine_load_components.append(stiffness_avg)
   if sitting_avg is not None:
       spine_load_components.append(sitting_avg)
   if sedentary_avg is not None:
       spine_load_components.append(sedentary_avg / 3.0)  # Normalize to 0-4 scale
   
   overall_spine_load = average(spine_load_components)
   ```

3. **Categorize Load**
   - `low`: overall_spine_load < 1.0
   - `moderate`: 1.0 ≤ overall_spine_load ≤ 2.0
   - `high`: overall_spine_load > 2.0

4. **Determine Pain Trend** (see `detectTrends` below)
   - Compare first logged day vs last logged day
   - `improving`: last < first
   - `worsening`: last > first
   - `stable`: last == first

5. **Determine Activity Balance**
   ```python
   if sitting_avg is not None and standing_avg is not None:
       if sitting_avg > standing_avg + 1:
           balance = "more sedentary"
       elif standing_avg > sitting_avg + 1:
           balance = "more active"
       else:
           balance = "balanced"
   ```

6. **Generate Summary Text**
   ```
   "This week shows {load_description} overall spine load. 
    Pain levels are {pain_trend} compared to the start of the week. 
    Activity patterns show a {activity_balance} balance between sitting and standing time."
   ```

**Reasoning:**
- Spine load combines multiple factors affecting spinal health
- Normalizing sedentary hours by dividing by 3 converts hours (0-24) to approximate 0-4 scale
- Activity balance helps identify if user is too sedentary

---

### 2. Improvements This Week

**Function:** `identifyImprovements(dailyData)`

**Calculation Steps:**

1. **Get Trends** (see `detectTrends` below)
   - For each metric, determine if it improved

2. **Check Each Metric:**
   ```python
   improvements = []
   
   if trends.pain_level == 'improving':
       improvements.append('Pain score decreased')
   
   if trends.morning_stiffness == 'improving':
       improvements.append('Morning stiffness decreased')
   
   if trends.stress_level == 'improving':
       improvements.append('Stress level decreased')
   
   if trends.sitting_time == 'improving':
       improvements.append('Sitting time reduced')
   
   if trends.standing_time == 'improving':
       improvements.append('Standing time increased')
   
   if trends.sedentary_hours == 'improving':
       improvements.append('Sedentary hours reduced')
   
   if trends.resting_heart_rate == 'improving':
       improvements.append('Resting heart rate decreased')
   ```

**Reasoning:**
- Only shows improvements to provide positive reinforcement
- Uses trend detection to compare first vs last logged day

---

### 3. Needs Attention

**Function:** `identifyNeedsAttention(dailyData)`

**Calculation Steps:**

1. **Get Weekly Averages** (see `computeWeeklyAverages` below)

2. **Check High Sedentary Hours**
   ```python
   if sedentary_avg is not None and sedentary_avg > 11:
       needs.append(f"High sedentary time ({sedentary_avg:.1f} hrs average)")
   ```
   - Threshold: 11 hours (research shows >10hrs/day is problematic)

3. **Check Increased Sitting Time**
   ```python
   first_day = get_first_logged_day(dailyData)
   last_day = get_last_logged_day(dailyData)
   
   if first_day.sitting_time is not None and last_day.sitting_time is not None:
       if last_day.sitting_time > first_day.sitting_time:
           needs.append('Sitting time increased this week')
   ```

4. **Check Missing Logs**
   ```python
   logged_days = [day for day in dailyData if has_any_data(day)]
   missing_days = len(dailyData) - len(logged_days)
   
   if missing_days > 0:
       # Check if new user (no logs or >70% missing)
       is_new_user = (len(logged_days) == 0 or 
                     (missing_days / len(dailyData) >= 0.7))
       
       if is_new_user:
           needs.append(f"{missing_days} day(s) with missing logs "
                       "(expected for new users who haven't been logging "
                       "for the full week yet)")
       else:
           needs.append(f"{missing_days} day(s) with missing logs")
   ```

5. **Check High Pain Levels**
   ```python
   if pain_avg is not None and pain_avg >= 2.0:
       needs.append(f"Elevated pain levels (average: {pain_avg:.1f})")
   ```
   - Threshold: 2.0 (Moderate pain or higher)

6. **Check High Stress**
   ```python
   if stress_avg is not None and stress_avg >= 3.0:
       needs.append(f"High stress levels (average: {stress_avg:.1f})")
   ```
   - Threshold: 3.0 (High stress or higher)

**Reasoning:**
- 11 hours sedentary threshold based on research on prolonged sitting
- New user detection prevents false alarms for incomplete data
- Pain threshold of 2.0 indicates moderate/severe pain requiring attention

---

### 4. Pattern Detection

**Function:** `detectPatterns(dailyData)`

**Calculation Steps:**

1. **Filter Valid Days**
   ```python
   logged_days = [day for day in dailyData if has_any_data(day)]
   if len(logged_days) < 2:
       return []  # Need at least 2 data points
   ```

2. **Sedentary Hours vs Pain Correlation**
   ```python
   sedentary_pain_pairs = [
       {'sedentary': day.fitbit_sedentary_hours, 'pain': day.pain_level}
       for day in logged_days
       if day.fitbit_sedentary_hours is not None and day.pain_level is not None
   ]
   
   if len(sedentary_pain_pairs) >= 2:
       # Sort by sedentary hours
       sorted_pairs = sorted(sedentary_pain_pairs, key=lambda x: x['sedentary'])
       
       # Split into low and high sedentary groups
       mid_point = len(sorted_pairs) // 2
       low_sedentary = sorted_pairs[:math.ceil(len(sorted_pairs) / 2)]
       high_sedentary = sorted_pairs[mid_point:]
       
       # Calculate average pain for each group
       avg_pain_low = average([p['pain'] for p in low_sedentary])
       avg_pain_high = average([p['pain'] for p in high_sedentary])
       
       # Check if significant difference (threshold: 0.3)
       if avg_pain_high > avg_pain_low + 0.3:
           threshold = average([p['sedentary'] for p in high_sedentary])
           patterns.append(
               f"Higher sedentary hours appear to align with increased pain levels"
           )
   ```

3. **Sitting Time vs Pain Correlation**
   ```python
   sitting_pain_pairs = [
       {'sitting': day.sitting_time, 'pain': day.pain_level}
       for day in logged_days
       if day.sitting_time is not None and day.pain_level is not None
   ]
   
   if len(sitting_pain_pairs) >= 2:
       sorted_pairs = sorted(sitting_pain_pairs, key=lambda x: x['sitting'])
       mid_point = len(sorted_pairs) // 2
       low_sitting = sorted_pairs[:math.ceil(len(sorted_pairs) / 2)]
       high_sitting = sorted_pairs[mid_point:]
       
       avg_pain_low = average([p['pain'] for p in low_sitting])
       avg_pain_high = average([p['pain'] for p in high_sitting])
       
       if avg_pain_high > avg_pain_low + 0.3:
           patterns.append(
               "Lower sitting time coincides with pain improvement"
           )
   ```

4. **Stress vs Heart Rate Correlation**
   ```python
   def get_heart_rate(day, is_fitbit_connected):
       if is_fitbit_connected:
           return day.fitbit_resting_heart_rate
       else:
           return day.manual_resting_heart_rate
   
   stress_hr_pairs = [
       {'stress': day.stress_level, 'hr': get_heart_rate(day, is_fitbit)}
       for day in logged_days
       if day.stress_level is not None and get_heart_rate(day, is_fitbit) is not None
   ]
   
   if len(stress_hr_pairs) >= 2:
       sorted_pairs = sorted(stress_hr_pairs, key=lambda x: x['stress'])
       mid_point = len(sorted_pairs) // 2
       low_stress = sorted_pairs[:math.ceil(len(sorted_pairs) / 2)]
       high_stress = sorted_pairs[mid_point:]
       
       avg_hr_low = average([p['hr'] for p in low_stress])
       avg_hr_high = average([p['hr'] for p in high_stress])
       
       # Threshold: 2 bpm difference
       if avg_hr_high > avg_hr_low + 2:
           patterns.append(
               "Lower stress levels appear to align with lower resting heart rate"
           )
   ```

**Reasoning:**
- Uses median split to compare high vs low groups
- 0.3 threshold for pain differences (30% of scale) ensures meaningful change
- 2 bpm threshold for HR accounts for normal daily variation
- Only reports patterns when sufficient data exists (≥2 pairs)

---

### 5. Next Week Focus

**Function:** `generateNextWeekFocus(dailyData)`

**Priority Order:**

1. **High Sedentary Hours** (Priority 1)
   ```python
   if sedentary_avg is not None and sedentary_avg > 11:
       return "Reducing sedentary time below 10 hours may help maintain lower pain levels"
   ```

2. **High Sitting Time** (Priority 2)
   ```python
   if sitting_avg is not None and sitting_avg >= 3:  # 6-8 hours or more
       return "Increasing standing time and reducing sitting duration may support spine health"
   ```

3. **Pain Trend Worsening** (Priority 3)
   ```python
   if trends.pain_level == 'worsening':
       return "Focus on reducing sedentary hours and increasing movement to address rising pain levels"
   ```

4. **High Stress** (Priority 4)
   ```python
   if stress_avg is not None and stress_avg >= 3:  # High or Very High
       return "Managing stress levels may help improve overall spine health and recovery"
   ```

5. **Missing Logs** (Priority 5)
   ```python
   logged_days = [day for day in dailyData if has_any_data(day)]
   if len(logged_days) < 4:  # Less than 4 days logged
       return "Consistent daily logging will help identify patterns and track improvements"
   ```

6. **Default Recommendations**
   ```python
   if trends.pain_level == 'improving':
       return "Continue current activity patterns to maintain the improving pain trend"
   else:
       return "Maintain balanced activity levels and monitor pain patterns for optimal spine health"
   ```

**Reasoning:**
- Prioritizes actionable items (sedentary time is most modifiable)
- Only returns ONE recommendation (most important)
- Provides specific, actionable guidance

---

## Pain & Stiffness Tab Calculations

### 1. Weekly Averages

**Calculation:**
```python
pain_values = [day.pain_level for day in dailyData]
stiffness_values = [day.morning_stiffness for day in dailyData]

pain_avg = average(pain_values)  # Filters null/-1
stiffness_avg = average(stiffness_values)
```

### 2. Trend Calculation

**Function:** `calculateTrend(values, metricName)`

**Steps:**
```python
# Filter valid values (not null, not -1)
valid_values = [v for v in values if v is not None and v != -1]

if len(valid_values) < 2:
    return None  # Need at least 2 data points

# Split into first half and second half
mid_point = len(valid_values) // 2
first_half = valid_values[:mid_point]
second_half = valid_values[mid_point:]

# Calculate averages
first_avg = sum(first_half) / len(first_half)
second_avg = sum(second_half) / len(second_half)

# Calculate difference and percent change
diff = second_avg - first_avg
percent_change = abs((diff / first_avg) * 100) if first_avg != 0 else 0

# If change is less than 5%, consider stable
if percent_change < 5:
    return {'direction': 'stable', 'change': 0}

# Determine direction based on metric type
lower_is_better = metric_name in [
    'painLevel', 'morningStiffness', 'stressLevel', 
    'sittingTime', 'fitbitSedentaryHours', 
    'restingHeartRate', 'fitbitRestingHeartRate', 'manualRestingHeartRate'
]

if lower_is_better:
    direction = 'better' if diff < 0 else 'worse'
else:
    direction = 'better' if diff > 0 else 'worse'

return {'direction': direction, 'change': percent_change}
```

**Reasoning:**
- Splits week in half to compare early vs late week trends
- 5% threshold prevents noise from small fluctuations
- Direction depends on whether lower or higher values are better

### 3. Best/Worst Days

**Function:** `findBestWorstDays(dailyData, 'painLevel', higherIsBetter=False)`

**Steps:**
```python
# Filter valid days (not null, not -1)
valid_days = [
    day for day in dailyData 
    if day.pain_level is not None and day.pain_level != -1
]

if len(valid_days) == 0:
    return {'best': None, 'worst': None}

# Sort by metric value
sorted_days = sorted(valid_days, key=lambda d: d.pain_level)

# For pain (lower is better)
best_day = sorted_days[0]  # Lowest pain
worst_day = sorted_days[-1]  # Highest pain
```

**Reasoning:**
- Best day = lowest pain (for pain/stiffness)
- Worst day = highest pain
- Only includes days with valid data

### 4. Pain-Activity Correlations

**Function:** `detectPainActivityCorrelation(dailyData)`

**Steps:**

1. **Pain vs Standing Time**
   ```python
   standing_pain_pairs = [
       {'standing': day.standing_time, 'pain': day.pain_level}
       for day in dailyData
       if day.standing_time is not None and day.pain_level is not None
   ]
   
   if len(standing_pain_pairs) >= 2:
       sorted_pairs = sorted(standing_pain_pairs, key=lambda x: x['standing'])
       mid = len(sorted_pairs) // 2
       low_standing = sorted_pairs[:math.ceil(len(sorted_pairs) / 2)]
       high_standing = sorted_pairs[mid:]
       
       avg_pain_low = average([p['pain'] for p in low_standing])
       avg_pain_high = average([p['pain'] for p in high_standing])
       
       if avg_pain_low > avg_pain_high + 0.3:
           percent_reduction = ((avg_pain_low - avg_pain_high) / avg_pain_low) * 100
           insights.append(
               f"Pain was {round(percent_reduction)}% lower on days with more standing time"
           )
   ```

2. **Pain vs Sedentary Hours**
   ```python
   sedentary_pain_pairs = [
       {'sedentary': day.fitbit_sedentary_hours, 'pain': day.pain_level}
       for day in dailyData
       if day.fitbit_sedentary_hours is not None and day.pain_level is not None
   ]
   
   if len(sedentary_pain_pairs) >= 2:
       sorted_pairs = sorted(sedentary_pain_pairs, key=lambda x: x['sedentary'])
       mid = len(sorted_pairs) // 2
       low_sedentary = sorted_pairs[:math.ceil(len(sorted_pairs) / 2)]
       high_sedentary = sorted_pairs[mid:]
       
       avg_pain_low = average([p['pain'] for p in low_sedentary])
       avg_pain_high = average([p['pain'] for p in high_sedentary])
       
       if avg_pain_high > avg_pain_low + 0.3:
           threshold = average([p['sedentary'] for p in high_sedentary])
           insights.append(
               f"Pain increased when sedentary hours exceeded {threshold:.1f}hrs"
           )
   ```

**Reasoning:**
- Uses median split to compare high vs low groups
- 0.3 threshold ensures meaningful difference (30% of 0-3 scale)
- Shows percentage reduction for standing time correlation

### 5. Why Did Pain/Stiffness Increase?

**Function:** `explainWhyMetricChanged(worstDay, bestDay, 'pain', isFitbitConnected)`

**Steps:**

1. **Compare Sedentary Hours**
   ```python
   worst_sedentary = worst_day.fitbit_sedentary_hours
   best_sedentary = best_day.fitbit_sedentary_hours
   
   if (worst_sedentary is not None and best_sedentary is not None and 
       worst_sedentary > best_sedentary + 1):
       explanations.append({
           'cause': f"Sedentary hours was {worst_sedentary:.1f}hrs "
                   f"(vs {best_sedentary:.1f}hrs on best day)",
           'explanation': 'Prolonged sitting increases pressure on the spine and '
                         'reduces circulation, which can contribute to increased discomfort.'
       })
   ```
   - Threshold: +1 hour difference

2. **Compare Standing Time**
   ```python
   worst_standing = worst_day.standing_time
   best_standing = best_day.standing_time
   
   if (worst_standing is not None and best_standing is not None and 
       worst_standing < best_standing):
       # Convert enum to label
       worst_label = enum_to_time_label(worst_standing)
       best_label = enum_to_time_label(best_standing)
       
       explanations.append({
           'cause': f"Standing time was {worst_label} (vs {best_label} on best day)",
           'explanation': 'Reduced standing time decreases muscle activation and circulation, '
                         'which can lead to increased stiffness and discomfort.'
       })
   ```

3. **Compare Stress Level**
   ```python
   worst_stress = worst_day.stress_level
   best_stress = best_day.stress_level
   
   if (worst_stress is not None and best_stress is not None and 
       worst_stress > best_stress):
       worst_label = enum_to_stress_label(worst_stress)
       best_label = enum_to_stress_label(best_stress)
       
       explanations.append({
           'cause': f"Stress level was {worst_label} (vs {best_label} on best day)",
           'explanation': 'Higher stress levels increase muscle tension and can lower pain threshold, '
                         'contributing to increased discomfort.'
       })
   ```

4. **Compare Sleep Duration**
   ```python
   if is_fitbit_connected:
       worst_sleep = worst_day.fitbit_total_minutes_asleep
       best_sleep = best_day.fitbit_total_minutes_asleep
       if worst_sleep is not None and best_sleep is not None:
           worst_hours = worst_sleep / 60.0
           best_hours = best_sleep / 60.0
   else:
       worst_sleep = worst_day.sleep_duration
       best_sleep = best_day.sleep_duration
       if (worst_sleep is not None and best_sleep is not None and 
           worst_sleep != -1 and best_sleep != -1):
           sleep_map = {0: 4.5, 1: 5.5, 2: 6.5, 3: 7.5, 4: 8.5}
           worst_hours = sleep_map[worst_sleep]
           best_hours = sleep_map[best_sleep]
   
   if (worst_hours is not None and best_hours is not None and 
       worst_hours < best_hours - 0.5):
       explanations.append({
           'cause': f"Sleep duration was {worst_hours:.1f}h (vs {best_hours:.1f}h on best day)",
           'explanation': "Insufficient sleep reduces the body's ability to recover and repair, "
                         "which can increase sensitivity to discomfort."
       })
   ```
   - Threshold: 0.5 hour difference

**Reasoning:**
- Compares worst day to best day to identify contributing factors
- Uses generic physiological explanations (no condition-specific language)
- Only includes explanations when significant differences exist
- Sleep conversion: Fitbit uses minutes, manual uses enum (0-4)

---

## Activity Tab Calculations

### 1. Activity Balance Score

**Function:** `calculateActivityBalance(dailyData)`

**Steps:**
```python
# Filter days with both standing and sitting time
logged_days = [
    day for day in dailyData
    if day.standing_time is not None and day.sitting_time is not None
]

if len(logged_days) == 0:
    return None

# Calculate balance for each day
balances = []
for day in logged_days:
    total = day.standing_time + day.sitting_time
    if total == 0:
        continue
    balance_percent = (day.standing_time / total) * 100
    balances.append(balance_percent)

# Return average balance
return average(balances)
```

**Reasoning:**
- Balance = percentage of time standing vs total (standing + sitting)
- Target: >60% standing for optimal spine health
- Only includes days with both values

### 2. Goal Tracking

**Standing Goal (≥4 hours = enum ≥3):**
```python
standing_goal_days = [
    day for day in dailyData
    if day.standing_time is not None and day.standing_time >= 3
]
goal_met = len(standing_goal_days) / 7.0 * 100  # Percentage
```

**Sedentary Limit (<11 hours):**
```python
sedentary_limit_days = [
    day for day in dailyData
    if day.fitbit_sedentary_hours is not None and day.fitbit_sedentary_hours < 11
]
limit_met = len(sedentary_limit_days) / 7.0 * 100
```

**Activity Balance (≥60% standing):**
```python
balance_optimal_days = []
for day in dailyData:
    if day.standing_time is not None and day.sitting_time is not None:
        total = day.standing_time + day.sitting_time
        if total > 0:
            standing_percent = (day.standing_time / total) * 100
            if standing_percent >= 60:
                balance_optimal_days.append(day)
balance_met = len(balance_optimal_days) / 7.0 * 100
```

**Reasoning:**
- Standing goal: enum 3 = 6-8 hours (we use ≥3 as ≥4 hours)
- Sedentary limit: 11 hours based on research
- Balance goal: 60% standing is optimal for spine health

### 3. Best/Worst Days

**Function:** `findBestWorstDays(dailyData, 'standingTime', higherIsBetter=True)`

**Steps:**
```python
valid_days = [
    day for day in dailyData
    if day.standing_time is not None and day.standing_time != -1
]

if len(valid_days) == 0:
    return {'best': None, 'worst': None}

sorted_days = sorted(valid_days, key=lambda d: d.standing_time)

# For standing time (higher is better)
best_day = sorted_days[-1]  # Highest standing time
worst_day = sorted_days[0]  # Lowest standing time
```

### 4. Why Did Activity Decrease?

**Function:** `explainWhyMetricChanged(worstDay, bestDay, 'activity', isFitbitConnected)`

**Steps:**

1. **Compare Pain Level**
   ```python
   worst_pain = worst_day.pain_level
   best_pain = best_day.pain_level
   
   if (worst_pain is not None and best_pain is not None and 
       worst_pain > best_pain):
       explanations.append({
           'cause': f"Pain level was {enum_to_pain_label(worst_pain)} "
                   f"(vs {enum_to_pain_label(best_pain)} on best day)",
           'explanation': 'Higher pain levels can reduce motivation and physical capacity, '
                         'leading to decreased activity and mobility.'
       })
   ```

2. **Compare Stress Level**
   ```python
   worst_stress = worst_day.stress_level
   best_stress = best_day.stress_level
   
   if (worst_stress is not None and best_stress is not None and 
       worst_stress > best_stress):
       explanations.append({
           'cause': f"Stress level was {enum_to_stress_label(worst_stress)} "
                   f"(vs {enum_to_stress_label(best_stress)} on best day)",
           'explanation': 'Elevated stress can reduce energy levels and motivation, '
                         'making it more difficult to maintain regular activity patterns.'
       })
   ```

3. **Compare Sleep** (same as Pain tab)

**Reasoning:**
- Activity can decrease due to pain, stress, or poor sleep
- Compares worst activity day to best activity day

---

## Heart Rate Tab Calculations

### 1. Heart Rate Value Selection

**Function:** `getHeartRateValue(day, isFitbitConnected)`

**Steps:**
```python
if is_fitbit_connected:
    # Prefer Fitbit, fall back to manual if not available
    if day.fitbit_resting_heart_rate is not None:
        return day.fitbit_resting_heart_rate
    elif day.manual_resting_heart_rate is not None:
        return day.manual_resting_heart_rate
    else:
        return None
else:
    # Use manual only
    if day.manual_resting_heart_rate is not None:
        return day.manual_resting_heart_rate
    else:
        return None
```

**Reasoning:**
- Fitbit data is preferred when available (more accurate)
- Falls back to manual if Fitbit data missing
- Manual only when Fitbit not connected

### 2. Average and Trend

**Steps:**
```python
hr_values = [get_heart_rate_value(day, is_fitbit) for day in dailyData]
hr_avg = average(hr_values)  # Filters null values
hr_trend = calculateTrend(hr_values, 'restingHeartRate')
```

**Note:** `restingHeartRate` is in `lowerIsBetter` list, so:
- `diff < 0` (decreasing) = 'better'
- `diff > 0` (increasing) = 'worse'

### 3. Recovery Insights

**Calculate Recovery Change:**
```python
valid_hr_days = [
    day for day in dailyData
    if get_heart_rate_value(day, is_fitbit) is not None
]

if len(valid_hr_days) >= 2:
    first_hr = get_heart_rate_value(valid_hr_days[0], is_fitbit)
    last_hr = get_heart_rate_value(valid_hr_days[-1], is_fitbit)
    
    if first_hr is not None and last_hr is not None:
        recovery_change = first_hr - last_hr  # Positive = improved
        
        if recovery_change > 2:  # Decreased by more than 2 bpm
            # Show: "Decreased by {recovery_change} bpm this week - improved recovery"
```

**Calculate Consistency:**
```python
if hr_avg is not None and len(hr_values) > 1:
    variance = sum((hr - hr_avg) ** 2 for hr in hr_values) / len(hr_values)
    std_dev = math.sqrt(variance)
    consistency = (1 - (std_dev / hr_avg)) * 100
    
    # Consistency > 95% = excellent
    # Consistency > 90% = good
```

**Reasoning:**
- Recovery change: Lower HR at end of week = better recovery
- Consistency: Lower variance = more consistent recovery
- 2 bpm threshold accounts for normal daily variation

### 4. Stress Correlation

**Function:** `detectHRStressCorrelation(dailyData, isFitbitConnected)`

**Steps:**
```python
logged_days = [
    day for day in dailyData
    if get_heart_rate_value(day, is_fitbit) is not None 
    and day.stress_level is not None
]

if len(logged_days) < 2:
    return []

# Sort by stress level
sorted_days = sorted(logged_days, key=lambda d: d.stress_level)
mid = len(sorted_days) // 2
low_stress = sorted_days[:math.ceil(len(sorted_days) / 2)]
high_stress = sorted_days[mid:]

avg_hr_low = average([get_heart_rate_value(d, is_fitbit) for d in low_stress])
avg_hr_high = average([get_heart_rate_value(d, is_fitbit) for d in high_stress])

if avg_hr_high > avg_hr_low + 2:  # Threshold: 2 bpm
    diff = round(avg_hr_high - avg_hr_low)
    insights.append(f"Heart rate was {diff} bpm higher on high-stress days")
elif avg_hr_low > avg_hr_high + 2:
    diff = round(avg_hr_low - avg_hr_high)
    insights.append(f"Lower stress days had average HR {diff} bpm lower")
```

**Reasoning:**
- Uses median split to compare low vs high stress groups
- 2 bpm threshold ensures meaningful difference

### 5. Best/Worst Days

**Steps:**
```python
# Create temporary array with hrValue
daily_data_with_hr = [
    {**day, 'hrValue': get_heart_rate_value(day, is_fitbit)}
    for day in dailyData
]

# Find best/worst (lower is better for HR)
hr_best_worst = find_best_worst_days(
    daily_data_with_hr, 
    'hrValue', 
    higher_is_better=False
)

# Map back to original day objects
if hr_best_worst['best']:
    hr_best_worst['best'] = next(
        d for d in dailyData if d.date == hr_best_worst['best'].date
    )
if hr_best_worst['worst']:
    hr_best_worst['worst'] = next(
        d for d in dailyData if d.date == hr_best_worst['worst'].date
    )
```

### 6. Why Did Heart Rate Increase?

**Function:** `explainWhyMetricChanged(worstDay, bestDay, 'heartRate', isFitbitConnected)`

**Steps:**

1. **Compare Stress Level** (same pattern as Pain tab)

2. **Compare Sleep Duration** (same pattern as Pain tab)

3. **Compare Pain Level**
   ```python
   worst_pain = worst_day.pain_level
   best_pain = best_day.pain_level
   
   if (worst_pain is not None and best_pain is not None and 
       worst_pain > best_pain):
       explanations.append({
           'cause': f"Pain level was {enum_to_pain_label(worst_pain)} "
                   f"(vs {enum_to_pain_label(best_pain)} on best day)",
           'explanation': 'Increased pain can trigger stress responses and '
                         'sympathetic nervous system activation, leading to elevated heart rate.'
       })
   ```

**Reasoning:**
- HR increases with stress, poor sleep, or pain
- All trigger sympathetic nervous system activation

---

## Sleep Tab Calculations

### 1. Sleep Value Selection

**Function:** `getSleepValue(day, isFitbitConnected)`

**Steps:**
```python
if is_fitbit_connected:
    if day.fitbit_total_minutes_asleep is not None:
        return day.fitbit_total_minutes_asleep  # Returns minutes
    elif day.sleep_duration is not None and day.sleep_duration != -1:
        return day.sleep_duration  # Fallback to manual enum
    else:
        return None
else:
    if day.sleep_duration is not None and day.sleep_duration != -1:
        return day.sleep_duration  # Returns enum 0-4
    else:
        return None
```

### 2. Sleep Hours Conversion

**Function:** `getSleepHours(day, isFitbitConnected)`

**Steps:**
```python
value = get_sleep_value(day, is_fitbit)

if value is None:
    return None

if is_fitbit_connected:
    # Fitbit: value is in minutes, convert to hours
    return value / 60.0
else:
    # Manual: value is enum, convert to approximate hours
    sleep_map = {
        0: 4.5,  # <5h -> average 4.5h
        1: 5.5,  # 5-6h -> average 5.5h
        2: 6.5,  # 6-7h -> average 6.5h
        3: 7.5,  # 7-8h -> average 7.5h
        4: 8.5   # >8h -> average 8.5h
    }
    return sleep_map.get(value)
```

**Reasoning:**
- Fitbit provides exact minutes
- Manual enum needs conversion to hours for calculations
- Uses midpoint of each range for approximation

### 3. Average and Trend

**Steps:**
```python
sleep_hours_values = [get_sleep_hours(day, is_fitbit) for day in dailyData]
sleep_avg = average(sleep_hours_values)
sleep_trend = calculateTrend(sleep_hours_values, 'sleepDuration')
```

**Note:** `sleepDuration` is NOT in `lowerIsBetter` list, so:
- `diff > 0` (increasing) = 'better'
- `diff < 0` (decreasing) = 'worse'

### 4. Sleep Quality Label

**Function:** `getSleepQualityLabel(hours)`

**Steps:**
```python
if hours is None:
    return None

if 7 <= hours <= 9:
    return {'label': 'Optimal', 'color': '#4caf50'}
elif 6 <= hours < 7:
    return {'label': 'Good', 'color': '#8bc34a'}
elif 5 <= hours < 6:
    return {'label': 'Fair', 'color': '#ff9800'}
elif hours < 5:
    return {'label': 'Insufficient', 'color': '#f44336'}
else:  # hours > 9
    return {'label': 'Excessive', 'color': '#ff9800'}
```

**Reasoning:**
- 7-9 hours is optimal for most adults
- <5 hours is insufficient
- >9 hours may indicate issues

### 5. Consistency Calculation

**Steps:**
```python
valid_sleep_days = [
    day for day in dailyData
    if get_sleep_value(day, is_fitbit) is not None
]

sleep_values = [get_sleep_hours(day, is_fitbit) for day in valid_sleep_days]

if sleep_avg is not None and len(sleep_values) > 1:
    variance = sum((hours - sleep_avg) ** 2 for hours in sleep_values) / len(sleep_values)
    std_dev = math.sqrt(variance)
    consistency = (1 - (std_dev / sleep_avg)) * 100
    
    # Consistency > 95% = excellent
    # Consistency > 90% = good
```

**Reasoning:**
- Measures how consistent sleep duration is
- Lower variance = more consistent sleep schedule

### 6. Best/Worst Days

**Steps:**
```python
# Create temporary array with sleepHours
daily_data_with_sleep = [
    {**day, 'sleepHours': get_sleep_hours(day, is_fitbit)}
    for day in dailyData
]

# Find best/worst (higher is better for sleep)
sleep_best_worst = find_best_worst_days(
    daily_data_with_sleep,
    'sleepHours',
    higher_is_better=True
)
```

### 7. Why Did Sleep Quality Decrease?

**Function:** `explainWhyMetricChanged(worstDay, bestDay, 'sleep', isFitbitConnected)`

**Steps:**

1. **Compare Stress Level**
   ```python
   worst_stress = worst_day.stress_level
   best_stress = best_day.stress_level
   
   if (worst_stress is not None and best_stress is not None and 
       worst_stress > best_stress):
       explanations.append({
           'cause': f"Stress level was {enum_to_stress_label(worst_stress)} "
                   f"(vs {enum_to_stress_label(best_stress)} on best day)",
           'explanation': 'Elevated stress increases cortisol levels and activates '
                         'the sympathetic nervous system, which disrupts the natural '
                         'sleep-wake cycle and reduces sleep quality.'
       })
   ```

2. **Compare Pain Level**
   ```python
   worst_pain = worst_day.pain_level
   best_pain = best_day.pain_level
   
   if (worst_pain is not None and best_pain is not None and 
       worst_pain > best_pain):
       explanations.append({
           'cause': f"Pain level was {enum_to_pain_label(worst_pain)} "
                   f"(vs {enum_to_pain_label(best_pain)} on best day)",
           'explanation': 'Increased discomfort can make it difficult to find '
                         'comfortable sleeping positions and may cause frequent '
                         'awakenings, disrupting sleep cycles.'
       })
   ```

3. **Compare Sedentary Hours**
   ```python
   worst_sedentary = worst_day.fitbit_sedentary_hours
   best_sedentary = best_day.fitbit_sedentary_hours
   
   if (worst_sedentary is not None and best_sedentary is not None and 
       worst_sedentary > best_sedentary + 1):
       explanations.append({
           'cause': f"Sedentary hours was {worst_sedentary:.1f}hrs "
                   f"(vs {best_sedentary:.1f}hrs on best day)",
           'explanation': 'Excessive sedentary time can disrupt circadian rhythms '
                         'and reduce the body\'s natural drive for restorative sleep, '
                         'affecting both sleep duration and quality.'
       })
   ```
   - Threshold: +1 hour difference

**Reasoning:**
- Sleep is affected by stress, pain, and activity levels
- All explanations use generic physiological language

---

## Common Utility Functions

### 1. Filter Nulls

```python
def filter_nulls(arr):
    """Filters out null, undefined, and -1 values"""
    return [val for val in arr 
            if val is not None and val != -1]
```

### 2. Calculate Average

```python
def average(values):
    """Calculates average of non-null values"""
    valid_values = filter_nulls(values)
    if len(valid_values) == 0:
        return None
    return sum(valid_values) / len(valid_values)
```

### 3. Get First/Last Logged Days

```python
def get_first_and_last_logged_days(daily_data):
    """Gets first and last days with any logged data"""
    logged_days = [
        day for day in daily_data
        if (day.pain_level is not None or
            day.morning_stiffness is not None or
            day.stress_level is not None or
            day.sitting_time is not None or
            day.standing_time is not None or
            day.resting_heart_rate is not None or
            day.fitbit_resting_heart_rate is not None or
            day.manual_resting_heart_rate is not None or
            day.fitbit_sedentary_hours is not None)
    ]
    
    if len(logged_days) == 0:
        return {'first': None, 'last': None}
    
    return {
        'first': logged_days[0],
        'last': logged_days[-1]
    }
```

### 4. Enum to Label Conversions

**Pain Level:**
```python
def enum_to_pain_label(value):
    if value is None or value == -1:
        return None
    labels = ['None', 'Mild', 'Moderate', 'Severe']
    return labels[value] if 0 <= value < len(labels) else None
```

**Stress Level:**
```python
def enum_to_stress_label(value):
    if value is None or value == -1:
        return None
    labels = ['Very Low', 'Low', 'Moderate', 'High', 'Very High']
    return labels[value] if 0 <= value < len(labels) else None
```

**Time (Standing/Sitting):**
```python
def enum_to_time_label(value):
    if value is None or value == -1:
        return None
    labels = [
        'Less than 2h',
        '2-4 hours',
        '4-6 hours',
        '6-8 hours',
        'Greater than 8h'
    ]
    return labels[value] if 0 <= value < len(labels) else None
```

---

## Key Thresholds and Constants

| Metric | Threshold | Reasoning |
|--------|-----------|-----------|
| Sedentary Hours (High) | > 11 hours | Research shows >10hrs/day is problematic |
| Sedentary Hours (Difference) | > 1 hour | Significant difference for explanations |
| Pain Level (Elevated) | ≥ 2.0 | Moderate pain or higher |
| Stress Level (High) | ≥ 3.0 | High stress or higher |
| Standing Goal | ≥ 3 (enum) | Equivalent to ≥4 hours |
| Activity Balance Target | ≥ 60% | Optimal standing time percentage |
| Sleep Duration (Difference) | > 0.5 hours | Significant difference for explanations |
| Sleep Optimal Range | 7-9 hours | Research-based optimal range |
| Pain Correlation Threshold | > 0.3 | 30% of 0-3 scale, meaningful difference |
| HR Correlation Threshold | > 2 bpm | Accounts for normal daily variation |
| Trend Stability Threshold | < 5% | Prevents noise from small fluctuations |
| Missing Logs (New User) | ≥ 70% | If >70% missing, likely new user |

---

## Implementation Notes

1. **Null Handling:**
   - Always check for `null`, `undefined`, and `-1`
   - Filter these values before calculations
   - Return `null` if insufficient data

2. **Fitbit vs Manual:**
   - Check `isFitbitConnected` flag
   - Prefer Fitbit data when available
   - Fall back to manual data if Fitbit missing
   - Use manual only when Fitbit not connected

3. **Enum Conversions:**
   - Enum values are integers (0-4)
   - Convert to labels for display
   - Convert to approximate numeric values for calculations (e.g., sleep duration)

4. **Median Split Method:**
   - Used for correlation detection
   - Split data into two groups at median
   - Compare averages of each group
   - More robust than linear regression for small datasets

5. **Best/Worst Days:**
   - Only include days with valid data
   - Sort by metric value
   - Best = optimal value (depends on metric)
   - Worst = suboptimal value

6. **Explanations:**
   - Only generate when significant differences exist
   - Use generic physiological language
   - Compare worst day to best day
   - Multiple explanations possible per metric

---

## Testing Recommendations

1. **Edge Cases:**
   - All null data
   - Partial data (some days missing)
   - New user (most days missing)
   - All same values (no variation)
   - Extreme values

2. **Data Validation:**
   - Verify enum values are in valid range (0-4)
   - Verify numeric values are reasonable
   - Handle missing Fitbit data gracefully
   - Handle missing manual data gracefully

3. **Calculation Verification:**
   - Test averages with known values
   - Test trends with clear patterns
   - Test correlations with known relationships
   - Test best/worst with clear extremes

---

## Summary

This document provides complete implementation details for all dashboard calculations. The key principles are:

1. **Robust null handling** - Always filter invalid values
2. **Fitbit preference** - Use Fitbit when available, fall back to manual
3. **Median split correlations** - Simple, robust method for small datasets
4. **Generic explanations** - No condition-specific assumptions
5. **Threshold-based detection** - Use research-based thresholds
6. **Single recommendation** - Next week focus returns only one item

All calculations are designed to be implementable in any backend language with these specifications.

