// src/utils/weeklyInsights.js
// Helper functions to analyze weekly spine health data

/**
 * Filters out null values from an array
 */
const filterNulls = (arr) => arr.filter(val => val !== null && val !== undefined);

/**
 * Calculates average of non-null values
 */
const average = (values) => {
  const validValues = filterNulls(values);
  if (validValues.length === 0) return null;
  return validValues.reduce((sum, val) => sum + val, 0) / validValues.length;
};

/**
 * Gets the first and last logged days (non-null data)
 */
const getFirstAndLastLoggedDays = (dailyData) => {
  const loggedDays = dailyData.filter(day => 
    day.painLevel !== null || 
    day.morningStiffness !== null || 
    day.stressLevel !== null ||
    day.sittingTime !== null ||
    day.standingTime !== null ||
    day.restingHeartRate !== null ||
    day.sedentaryHours !== null
  );
  
  if (loggedDays.length === 0) return { first: null, last: null };
  
  return {
    first: loggedDays[0],
    last: loggedDays[loggedDays.length - 1]
  };
};

/**
 * Computes weekly averages for all metrics
 */
export const computeWeeklyAverages = (dailyData) => {
  if (!dailyData || !Array.isArray(dailyData)) {
    return {
      painLevel: null,
      morningStiffness: null,
      stressLevel: null,
      sittingTime: null,
      standingTime: null,
      sedentaryHours: null,
      restingHeartRate: null
    };
  }

  return {
    painLevel: average(dailyData.map(d => d.painLevel)),
    morningStiffness: average(dailyData.map(d => d.morningStiffness)),
    stressLevel: average(dailyData.map(d => d.stressLevel)),
    sittingTime: average(dailyData.map(d => d.sittingTime)),
    standingTime: average(dailyData.map(d => d.standingTime)),
    sedentaryHours: average(dailyData.map(d => d.sedentaryHours)),
    restingHeartRate: average(dailyData.map(d => d.restingHeartRate))
  };
};

/**
 * Detects trend direction (improving, stable, worsening)
 * Compares first logged day vs last logged day
 */
export const detectTrends = (dailyData) => {
  const { first, last } = getFirstAndLastLoggedDays(dailyData);
  
  if (!first || !last) {
    return {
      painLevel: null,
      morningStiffness: null,
      stressLevel: null,
      sittingTime: null,
      standingTime: null,
      sedentaryHours: null,
      restingHeartRate: null
    };
  }

  const compare = (firstVal, lastVal) => {
    if (firstVal === null || lastVal === null) return null;
    if (lastVal < firstVal) return 'improving';
    if (lastVal > firstVal) return 'worsening';
    return 'stable';
  };

  // For restingHeartRate and sedentaryHours, lower is better
  // For others, lower is better (pain, stiffness, stress, sitting)
  return {
    painLevel: compare(first.painLevel, last.painLevel),
    morningStiffness: compare(first.morningStiffness, last.morningStiffness),
    stressLevel: compare(first.stressLevel, last.stressLevel),
    sittingTime: compare(first.sittingTime, last.sittingTime),
    standingTime: compare(last.standingTime, first.standingTime), // Higher is better
    sedentaryHours: compare(first.sedentaryHours, last.sedentaryHours),
    restingHeartRate: compare(first.restingHeartRate, last.restingHeartRate)
  };
};

/**
 * Identifies metrics that improved this week
 */
export const identifyImprovements = (dailyData) => {
  const trends = detectTrends(dailyData);
  const improvements = [];

  if (trends.painLevel === 'improving') {
    improvements.push('Pain score decreased');
  }
  if (trends.morningStiffness === 'improving') {
    improvements.push('Morning stiffness decreased');
  }
  if (trends.stressLevel === 'improving') {
    improvements.push('Stress level decreased');
  }
  if (trends.sittingTime === 'improving') {
    improvements.push('Sitting time reduced');
  }
  if (trends.standingTime === 'improving') {
    improvements.push('Standing time increased');
  }
  if (trends.sedentaryHours === 'improving') {
    improvements.push('Sedentary hours reduced');
  }
  if (trends.restingHeartRate === 'improving') {
    improvements.push('Resting heart rate decreased');
  }

  return improvements;
};

/**
 * Identifies areas that need attention
 */
export const identifyNeedsAttention = (dailyData) => {
  const needs = [];
  const averages = computeWeeklyAverages(dailyData);
  const { first, last } = getFirstAndLastLoggedDays(dailyData);

  // High sedentary hours
  if (averages.sedentaryHours !== null && averages.sedentaryHours > 11) {
    needs.push(`High sedentary time (${averages.sedentaryHours.toFixed(1)} hrs average)`);
  }

  // Increased sitting time
  if (first && last && first.sittingTime !== null && last.sittingTime !== null) {
    if (last.sittingTime > first.sittingTime) {
      needs.push('Sitting time increased this week');
    }
  }

  // Missing logs
  const loggedDays = dailyData.filter(day => 
    day.painLevel !== null || 
    day.morningStiffness !== null || 
    day.stressLevel !== null ||
    day.sittingTime !== null ||
    day.standingTime !== null ||
    day.restingHeartRate !== null ||
    day.sedentaryHours !== null
  );
  const missingDays = dailyData.length - loggedDays.length;
  if (missingDays > 0) {
    needs.push(`${missingDays} day${missingDays > 1 ? 's' : ''} with missing logs`);
  }

  // High pain levels
  if (averages.painLevel !== null && averages.painLevel >= 2) {
    needs.push(`Elevated pain levels (average: ${averages.painLevel.toFixed(1)})`);
  }

  // High stress
  if (averages.stressLevel !== null && averages.stressLevel >= 3) {
    needs.push(`High stress levels (average: ${averages.stressLevel.toFixed(1)})`);
  }

  return needs;
};

/**
 * Detects patterns and correlations
 */
export const detectPatterns = (dailyData) => {
  const patterns = [];
  const loggedDays = dailyData.filter(day => 
    day.painLevel !== null || 
    day.morningStiffness !== null || 
    day.stressLevel !== null ||
    day.sittingTime !== null ||
    day.standingTime !== null ||
    day.restingHeartRate !== null ||
    day.sedentaryHours !== null
  );

  if (loggedDays.length < 2) {
    return patterns; // Need at least 2 data points
  }

  // Check sedentary hours vs pain correlation
  const sedentaryPainPairs = loggedDays
    .filter(day => day.sedentaryHours !== null && day.painLevel !== null)
    .map(day => ({ sedentary: day.sedentaryHours, pain: day.painLevel }));
  
  if (sedentaryPainPairs.length >= 2) {
    const sorted = [...sedentaryPainPairs].sort((a, b) => a.sedentary - b.sedentary);
    const lowSedentary = sorted.slice(0, Math.ceil(sorted.length / 2));
    const highSedentary = sorted.slice(Math.floor(sorted.length / 2));
    const avgPainLow = average(lowSedentary.map(p => p.pain));
    const avgPainHigh = average(highSedentary.map(p => p.pain));
    
    if (avgPainLow !== null && avgPainHigh !== null && avgPainHigh > avgPainLow + 0.3) {
      patterns.push('Higher sedentary hours appear to align with increased pain levels');
    }
  }

  // Check sitting time vs pain
  const sittingPainPairs = loggedDays
    .filter(day => day.sittingTime !== null && day.painLevel !== null)
    .map(day => ({ sitting: day.sittingTime, pain: day.painLevel }));
  
  if (sittingPainPairs.length >= 2) {
    const sorted = [...sittingPainPairs].sort((a, b) => a.sitting - b.sitting);
    const lowSitting = sorted.slice(0, Math.ceil(sorted.length / 2));
    const highSitting = sorted.slice(Math.floor(sorted.length / 2));
    const avgPainLow = average(lowSitting.map(p => p.pain));
    const avgPainHigh = average(highSitting.map(p => p.pain));
    
    if (avgPainLow !== null && avgPainHigh !== null && avgPainHigh > avgPainLow + 0.3) {
      patterns.push('Lower sitting time coincides with pain improvement');
    }
  }

  // Check stress vs resting heart rate
  const stressHRPairs = loggedDays
    .filter(day => day.stressLevel !== null && day.restingHeartRate !== null)
    .map(day => ({ stress: day.stressLevel, hr: day.restingHeartRate }));
  
  if (stressHRPairs.length >= 2) {
    const sorted = [...stressHRPairs].sort((a, b) => a.stress - b.stress);
    const lowStress = sorted.slice(0, Math.ceil(sorted.length / 2));
    const highStress = sorted.slice(Math.floor(sorted.length / 2));
    const avgHRLow = average(lowStress.map(p => p.hr));
    const avgHRHigh = average(highStress.map(p => p.hr));
    
    if (avgHRLow !== null && avgHRHigh !== null && avgHRHigh > avgHRLow + 2) {
      patterns.push('Lower stress levels appear to align with lower resting heart rate');
    }
  }

  return patterns;
};

/**
 * Generates weekly summary text
 */
export const generateWeeklySummary = (dailyData) => {
  const averages = computeWeeklyAverages(dailyData);
  const trends = detectTrends(dailyData);
  const { first, last } = getFirstAndLastLoggedDays(dailyData);

  if (!first || !last) {
    return 'Insufficient data to generate weekly summary. Please log your daily activities.';
  }

  // Calculate overall spine load (weighted combination)
  const spineLoadComponents = [];
  if (averages.painLevel !== null) spineLoadComponents.push(averages.painLevel);
  if (averages.morningStiffness !== null) spineLoadComponents.push(averages.morningStiffness);
  if (averages.sittingTime !== null) spineLoadComponents.push(averages.sittingTime);
  if (averages.sedentaryHours !== null) spineLoadComponents.push(averages.sedentaryHours / 3); // Normalize
  
  const overallSpineLoad = spineLoadComponents.length > 0 
    ? average(spineLoadComponents) 
    : null;

  let loadDescription = 'moderate';
  if (overallSpineLoad !== null) {
    if (overallSpineLoad < 1) loadDescription = 'low';
    else if (overallSpineLoad > 2) loadDescription = 'high';
  }

  // Pain trend
  let painTrend = 'stable';
  if (trends.painLevel === 'improving') painTrend = 'improving';
  else if (trends.painLevel === 'worsening') painTrend = 'worsening';

  // Activity balance
  const avgStanding = averages.standingTime;
  const avgSitting = averages.sittingTime;
  let activityBalance = 'balanced';
  if (avgSitting !== null && avgStanding !== null) {
    if (avgSitting > avgStanding + 1) activityBalance = 'more sedentary';
    else if (avgStanding > avgSitting + 1) activityBalance = 'more active';
  }

  const summary = `This week shows ${loadDescription} overall spine load. ` +
    `Pain levels are ${painTrend} compared to the start of the week. ` +
    `Activity patterns show a ${activityBalance} balance between sitting and standing time.`;

  return summary;
};

/**
 * Generates next week focus recommendation
 */
export const generateNextWeekFocus = (dailyData) => {
  const averages = computeWeeklyAverages(dailyData);
  const trends = detectTrends(dailyData);
  const needs = identifyNeedsAttention(dailyData);

  // Priority 1: High sedentary hours
  if (averages.sedentaryHours !== null && averages.sedentaryHours > 11) {
    return `Reducing sedentary time below 10 hours may help maintain lower pain levels`;
  }

  // Priority 2: High sitting time
  if (averages.sittingTime !== null && averages.sittingTime >= 3) {
    return `Increasing standing time and reducing sitting duration may support spine health`;
  }

  // Priority 3: Pain trend worsening
  if (trends.painLevel === 'worsening') {
    return `Focus on reducing sedentary hours and increasing movement to address rising pain levels`;
  }

  // Priority 4: High stress
  if (averages.stressLevel !== null && averages.stressLevel >= 3) {
    return `Managing stress levels may help improve overall spine health and recovery`;
  }

  // Priority 5: Missing logs
  const loggedDays = dailyData.filter(day => 
    day.painLevel !== null || 
    day.morningStiffness !== null || 
    day.stressLevel !== null ||
    day.sittingTime !== null ||
    day.standingTime !== null ||
    day.restingHeartRate !== null ||
    day.sedentaryHours !== null
  );
  if (loggedDays.length < 4) {
    return `Consistent daily logging will help identify patterns and track improvements`;
  }

  // Default: maintain current trajectory
  if (trends.painLevel === 'improving') {
    return `Continue current activity patterns to maintain the improving pain trend`;
  }

  return `Maintain balanced activity levels and monitor pain patterns for optimal spine health`;
};

/**
 * Main function to compute all weekly insights
 */
export const computeWeeklyInsights = (weeklyGraphData) => {
  if (!weeklyGraphData || !weeklyGraphData.dailyData) {
    return null;
  }

  const dailyData = weeklyGraphData.dailyData;
  
  return {
    summary: generateWeeklySummary(dailyData),
    improvements: identifyImprovements(dailyData),
    needsAttention: identifyNeedsAttention(dailyData),
    patterns: detectPatterns(dailyData),
    nextWeekFocus: generateNextWeekFocus(dailyData),
    averages: computeWeeklyAverages(dailyData),
    trends: detectTrends(dailyData)
  };
};

