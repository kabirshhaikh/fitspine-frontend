// src/utils/chartInsights.js
// Minimal helper functions for chart insights

/**
 * Filters out null values
 */
const filterNulls = (arr) => arr.filter(val => val !== null && val !== undefined && val !== -1);

/**
 * Calculates average of non-null values
 */
const average = (values) => {
  const validValues = filterNulls(values);
  if (validValues.length === 0) return null;
  return validValues.reduce((sum, val) => sum + val, 0) / validValues.length;
};

/**
 * Calculates activity balance score (standing vs sitting ratio)
 */
export const calculateActivityBalance = (dailyData) => {
  const loggedDays = dailyData.filter(day => 
    day.standingTime !== null && day.sittingTime !== null
  );

  if (loggedDays.length === 0) return null;

  const balances = loggedDays.map(day => {
    const total = day.standingTime + day.sittingTime;
    if (total === 0) return null;
    return (day.standingTime / total) * 100;
  });

  return average(balances);
};

/**
 * Detects pain-activity correlations
 */
export const detectPainActivityCorrelation = (dailyData) => {
  const insights = [];
  const loggedDays = dailyData.filter(day => 
    day.painLevel !== null && 
    (day.standingTime !== null || day.fitbitSedentaryHours !== null)
  );

  if (loggedDays.length < 2) return insights;

  // Pain vs Standing Time
  const standingPainPairs = loggedDays
    .filter(day => day.standingTime !== null && day.painLevel !== null)
    .map(day => ({ standing: day.standingTime, pain: day.painLevel }));
  
  if (standingPainPairs.length >= 2) {
    const sorted = [...standingPainPairs].sort((a, b) => a.standing - b.standing);
    const lowStanding = sorted.slice(0, Math.ceil(sorted.length / 2));
    const highStanding = sorted.slice(Math.floor(sorted.length / 2));
    const avgPainLow = average(lowStanding.map(p => p.pain));
    const avgPainHigh = average(highStanding.map(p => p.pain));
    
    if (avgPainLow !== null && avgPainHigh !== null && avgPainLow > avgPainHigh + 0.3) {
      const percentReduction = ((avgPainLow - avgPainHigh) / avgPainLow) * 100;
      insights.push(`Pain was ${Math.round(percentReduction)}% lower on days with more standing time`);
    }
  }

  // Pain vs Sedentary Hours
  const sedentaryPainPairs = loggedDays
    .filter(day => day.fitbitSedentaryHours !== null && day.painLevel !== null)
    .map(day => ({ sedentary: day.fitbitSedentaryHours, pain: day.painLevel }));
  
  if (sedentaryPainPairs.length >= 2) {
    const sorted = [...sedentaryPainPairs].sort((a, b) => a.sedentary - b.sedentary);
    const lowSedentary = sorted.slice(0, Math.ceil(sorted.length / 2));
    const highSedentary = sorted.slice(Math.floor(sorted.length / 2));
    const avgPainLow = average(lowSedentary.map(p => p.pain));
    const avgPainHigh = average(highSedentary.map(p => p.pain));
    
    if (avgPainLow !== null && avgPainHigh !== null && avgPainHigh > avgPainLow + 0.3) {
      const threshold = average(highSedentary.map(p => p.sedentary));
      insights.push(`Pain increased when sedentary hours exceeded ${threshold.toFixed(1)}hrs`);
    }
  }

  return insights;
};

/**
 * Detects heart rate - stress correlation
 */
export const detectHRStressCorrelation = (dailyData, isFitbitConnected) => {
  const insights = [];
  
  // Get heart rate value based on Fitbit connection
  const getHeartRate = (day) => {
    if (isFitbitConnected) {
      return day.fitbitRestingHeartRate !== null && day.fitbitRestingHeartRate !== undefined
        ? day.fitbitRestingHeartRate
        : null;
    } else {
      return day.manualRestingHeartRate !== null && day.manualRestingHeartRate !== undefined
        ? day.manualRestingHeartRate
        : null;
    }
  };
  
  const loggedDays = dailyData.filter(day => 
    getHeartRate(day) !== null && day.stressLevel !== null
  );

  if (loggedDays.length < 2) return insights;

  const sorted = [...loggedDays].sort((a, b) => a.stressLevel - b.stressLevel);
  const lowStress = sorted.slice(0, Math.ceil(sorted.length / 2));
  const highStress = sorted.slice(Math.floor(sorted.length / 2));
  
  const avgHRLow = average(lowStress.map(d => getHeartRate(d)));
  const avgHRHigh = average(highStress.map(d => getHeartRate(d)));
  
  if (avgHRLow !== null && avgHRHigh !== null && avgHRHigh > avgHRLow + 2) {
    const diff = Math.round(avgHRHigh - avgHRLow);
    insights.push(`Heart rate was ${diff} bpm higher on high-stress days`);
  } else if (avgHRLow !== null && avgHRHigh !== null && avgHRLow > avgHRHigh + 2) {
    const diff = Math.round(avgHRLow - avgHRHigh);
    insights.push(`Lower stress days had average HR ${diff} bpm lower`);
  }

  return insights;
};

/**
 * Finds best and worst days for a metric
 * @param {Array} dailyData - Array of daily data objects
 * @param {string} metric - Metric name to compare
 * @param {boolean} higherIsBetter - If true, higher values are better (e.g., sleep hours). Default: false (lower is better)
 */
export const findBestWorstDays = (dailyData, metric, higherIsBetter = false) => {
  const validDays = dailyData.filter(day => day[metric] !== null && day[metric] !== -1 && day[metric] !== undefined);
  if (validDays.length === 0) return { best: null, worst: null };

  const sorted = [...validDays].sort((a, b) => a[metric] - b[metric]);
  return {
    best: higherIsBetter ? sorted[sorted.length - 1] : sorted[0],
    worst: higherIsBetter ? sorted[0] : sorted[sorted.length - 1]
  };
};

/**
 * Gets first and last logged days
 */
export const getFirstAndLastLoggedDays = (dailyData) => {
  const loggedDays = dailyData.filter(day => 
    day.painLevel !== null || 
    day.morningStiffness !== null || 
    day.stressLevel !== null ||
    day.sittingTime !== null ||
    day.standingTime !== null ||
    day.restingHeartRate !== null ||
    day.fitbitRestingHeartRate !== null ||
    day.manualRestingHeartRate !== null ||
    day.fitbitSedentaryHours !== null
  );
  
  if (loggedDays.length === 0) return { first: null, last: null };
  
  return {
    first: loggedDays[0],
    last: loggedDays[loggedDays.length - 1]
  };
};

/**
 * Helper to get time label from enum value
 */
const getTimeLabelFromEnum = (value) => {
  if (value === null || value === -1) return null;
  const labels = ['Less than 2h', '2-4 hours', '4-6 hours', '6-8 hours', 'Greater than 8h'];
  return labels[value] || null;
};

/**
 * Helper to get stress label from enum value
 */
const getStressLabelFromEnum = (value) => {
  if (value === null || value === -1) return null;
  const labels = ['Very Low', 'Low', 'Moderate', 'High', 'Very High'];
  return labels[value] || null;
};

/**
 * Helper to get pain label from enum value
 */
const getPainLabelFromEnum = (value) => {
  if (value === null || value === -1) return null;
  const labels = ['None', 'Mild', 'Moderate', 'Severe'];
  return labels[value] || null;
};

/**
 * Explains why a metric changed by comparing worst day to best day
 * Uses generic physiological explanations applicable to all users
 * @param {Object} worstDay - The worst day object
 * @param {Object} bestDay - The best day object
 * @param {string} metricType - Type of metric: 'pain', 'stiffness', 'activity', 'heartRate', 'sleep'
 * @param {boolean} isFitbitConnected - Whether Fitbit is connected (for heart rate and sleep)
 * @returns {Array} Array of explanation strings
 */
export const explainWhyMetricChanged = (worstDay, bestDay, metricType, isFitbitConnected = false) => {
  if (!worstDay || !bestDay) return [];
  
  const explanations = [];
  
  // Helper to safely get value
  const getValue = (day, field) => {
    if (day[field] === null || day[field] === undefined || day[field] === -1) return null;
    return day[field];
  };
  
  // Helper to format comparison
  const formatComparison = (worstVal, bestVal, label, unit = '') => {
    if (worstVal === null || bestVal === null) return null;
    return `${label} was ${worstVal}${unit} (vs ${bestVal}${unit} on best day)`;
  };
  
  switch (metricType) {
    case 'pain':
    case 'stiffness': {
      // Compare sedentary hours
      const worstSedentary = getValue(worstDay, 'fitbitSedentaryHours');
      const bestSedentary = getValue(bestDay, 'fitbitSedentaryHours');
      if (worstSedentary !== null && bestSedentary !== null && worstSedentary > bestSedentary + 1) {
        explanations.push({
          cause: formatComparison(worstSedentary.toFixed(1), bestSedentary.toFixed(1), 'Sedentary hours', 'hrs'),
          explanation: 'Prolonged sitting increases pressure on the spine and reduces circulation, which can contribute to increased discomfort.'
        });
      }
      
      // Compare standing time
      const worstStanding = getValue(worstDay, 'standingTime');
      const bestStanding = getValue(bestDay, 'standingTime');
      if (worstStanding !== null && bestStanding !== null && worstStanding < bestStanding) {
        const worstLabel = getTimeLabelFromEnum(worstStanding);
        const bestLabel = getTimeLabelFromEnum(bestStanding);
        if (worstLabel && bestLabel) {
          explanations.push({
            cause: formatComparison(worstLabel, bestLabel, 'Standing time', ''),
            explanation: 'Reduced standing time decreases muscle activation and circulation, which can lead to increased stiffness and discomfort.'
          });
        }
      }
      
      // Compare stress level
      const worstStress = getValue(worstDay, 'stressLevel');
      const bestStress = getValue(bestDay, 'stressLevel');
      if (worstStress !== null && bestStress !== null && worstStress > bestStress) {
        const worstLabel = getStressLabelFromEnum(worstStress);
        const bestLabel = getStressLabelFromEnum(bestStress);
        if (worstLabel && bestLabel) {
          explanations.push({
            cause: formatComparison(worstLabel, bestLabel, 'Stress level', ''),
            explanation: 'Higher stress levels increase muscle tension and can lower pain threshold, contributing to increased discomfort.'
          });
        }
      }
      
      // Compare sleep (if available)
      let worstSleepHours = null;
      let bestSleepHours = null;
      if (isFitbitConnected) {
        const worstSleep = getValue(worstDay, 'fitbitTotalMinutesAsleep');
        const bestSleep = getValue(bestDay, 'fitbitTotalMinutesAsleep');
        if (worstSleep !== null && bestSleep !== null) {
          worstSleepHours = (worstSleep / 60).toFixed(1);
          bestSleepHours = (bestSleep / 60).toFixed(1);
        }
      } else {
        const worstSleep = getValue(worstDay, 'sleepDuration');
        const bestSleep = getValue(bestDay, 'sleepDuration');
        if (worstSleep !== null && bestSleep !== null && worstSleep !== -1 && bestSleep !== -1) {
          const sleepMap = { 0: 4.5, 1: 5.5, 2: 6.5, 3: 7.5, 4: 8.5 };
          worstSleepHours = sleepMap[worstSleep]?.toFixed(1);
          bestSleepHours = sleepMap[bestSleep]?.toFixed(1);
        }
      }
      if (worstSleepHours && bestSleepHours && parseFloat(worstSleepHours) < parseFloat(bestSleepHours) - 0.5) {
        explanations.push({
          cause: formatComparison(worstSleepHours, bestSleepHours, 'Sleep duration', 'h'),
          explanation: 'Insufficient sleep reduces the body\'s ability to recover and repair, which can increase sensitivity to discomfort.'
        });
      }
      
      break;
    }
    
    case 'activity': {
      // Compare pain level
      const worstPain = getValue(worstDay, 'painLevel');
      const bestPain = getValue(bestDay, 'painLevel');
      if (worstPain !== null && bestPain !== null && worstPain > bestPain) {
        const worstLabel = getPainLabelFromEnum(worstPain);
        const bestLabel = getPainLabelFromEnum(bestPain);
        if (worstLabel && bestLabel) {
          explanations.push({
            cause: formatComparison(worstLabel, bestLabel, 'Pain level', ''),
            explanation: 'Higher pain levels can reduce motivation and physical capacity, leading to decreased activity and mobility.'
          });
        }
      }
      
      // Compare stress level
      const worstStress = getValue(worstDay, 'stressLevel');
      const bestStress = getValue(bestDay, 'stressLevel');
      if (worstStress !== null && bestStress !== null && worstStress > bestStress) {
        const worstLabel = getStressLabelFromEnum(worstStress);
        const bestLabel = getStressLabelFromEnum(bestStress);
        if (worstLabel && bestLabel) {
          explanations.push({
            cause: formatComparison(worstLabel, bestLabel, 'Stress level', ''),
            explanation: 'Elevated stress can reduce energy levels and motivation, making it more difficult to maintain regular activity patterns.'
          });
        }
      }
      
      // Compare sleep
      let worstSleepHours = null;
      let bestSleepHours = null;
      if (isFitbitConnected) {
        const worstSleep = getValue(worstDay, 'fitbitTotalMinutesAsleep');
        const bestSleep = getValue(bestDay, 'fitbitTotalMinutesAsleep');
        if (worstSleep !== null && bestSleep !== null) {
          worstSleepHours = (worstSleep / 60).toFixed(1);
          bestSleepHours = (bestSleep / 60).toFixed(1);
        }
      } else {
        const worstSleep = getValue(worstDay, 'sleepDuration');
        const bestSleep = getValue(bestDay, 'sleepDuration');
        if (worstSleep !== null && bestSleep !== null && worstSleep !== -1 && bestSleep !== -1) {
          const sleepMap = { 0: 4.5, 1: 5.5, 2: 6.5, 3: 7.5, 4: 8.5 };
          worstSleepHours = sleepMap[worstSleep]?.toFixed(1);
          bestSleepHours = sleepMap[bestSleep]?.toFixed(1);
        }
      }
      if (worstSleepHours && bestSleepHours && parseFloat(worstSleepHours) < parseFloat(bestSleepHours) - 0.5) {
        explanations.push({
          cause: formatComparison(worstSleepHours, bestSleepHours, 'Sleep duration', 'h'),
          explanation: 'Inadequate sleep reduces energy levels and physical capacity, making it harder to maintain active movement throughout the day.'
        });
      }
      
      break;
    }
    
    case 'heartRate': {
      // Compare stress level
      const worstStress = getValue(worstDay, 'stressLevel');
      const bestStress = getValue(bestDay, 'stressLevel');
      if (worstStress !== null && bestStress !== null && worstStress > bestStress) {
        const worstLabel = getStressLabelFromEnum(worstStress);
        const bestLabel = getStressLabelFromEnum(bestStress);
        if (worstLabel && bestLabel) {
          explanations.push({
            cause: formatComparison(worstLabel, bestLabel, 'Stress level', ''),
            explanation: 'Higher stress activates the sympathetic nervous system, increasing heart rate and cardiac output as part of the body\'s stress response.'
          });
        }
      }
      
      // Compare sleep
      let worstSleepHours = null;
      let bestSleepHours = null;
      if (isFitbitConnected) {
        const worstSleep = getValue(worstDay, 'fitbitTotalMinutesAsleep');
        const bestSleep = getValue(bestDay, 'fitbitTotalMinutesAsleep');
        if (worstSleep !== null && bestSleep !== null) {
          worstSleepHours = (worstSleep / 60).toFixed(1);
          bestSleepHours = (bestSleep / 60).toFixed(1);
        }
      } else {
        const worstSleep = getValue(worstDay, 'sleepDuration');
        const bestSleep = getValue(bestDay, 'sleepDuration');
        if (worstSleep !== null && bestSleep !== null && worstSleep !== -1 && bestSleep !== -1) {
          const sleepMap = { 0: 4.5, 1: 5.5, 2: 6.5, 3: 7.5, 4: 8.5 };
          worstSleepHours = sleepMap[worstSleep]?.toFixed(1);
          bestSleepHours = sleepMap[bestSleep]?.toFixed(1);
        }
      }
      if (worstSleepHours && bestSleepHours && parseFloat(worstSleepHours) < parseFloat(bestSleepHours) - 0.5) {
        explanations.push({
          cause: formatComparison(worstSleepHours, bestSleepHours, 'Sleep duration', 'h'),
          explanation: 'Insufficient sleep prevents the body from fully entering recovery mode, keeping heart rate elevated due to incomplete parasympathetic activation.'
        });
      }
      
      // Compare pain level
      const worstPain = getValue(worstDay, 'painLevel');
      const bestPain = getValue(bestDay, 'painLevel');
      if (worstPain !== null && bestPain !== null && worstPain > bestPain) {
        const worstLabel = getPainLabelFromEnum(worstPain);
        const bestLabel = getPainLabelFromEnum(bestPain);
        if (worstLabel && bestLabel) {
          explanations.push({
            cause: formatComparison(worstLabel, bestLabel, 'Pain level', ''),
            explanation: 'Increased pain can trigger stress responses and sympathetic nervous system activation, leading to elevated heart rate.'
          });
        }
      }
      
      break;
    }
    
    case 'sleep': {
      // Compare stress level
      const worstStress = getValue(worstDay, 'stressLevel');
      const bestStress = getValue(bestDay, 'stressLevel');
      if (worstStress !== null && bestStress !== null && worstStress > bestStress) {
        const worstLabel = getStressLabelFromEnum(worstStress);
        const bestLabel = getStressLabelFromEnum(bestStress);
        if (worstLabel && bestLabel) {
          explanations.push({
            cause: formatComparison(worstLabel, bestLabel, 'Stress level', ''),
            explanation: 'Elevated stress increases cortisol levels and activates the sympathetic nervous system, which disrupts the natural sleep-wake cycle and reduces sleep quality.'
          });
        }
      }
      
      // Compare pain level
      const worstPain = getValue(worstDay, 'painLevel');
      const bestPain = getValue(bestDay, 'painLevel');
      if (worstPain !== null && bestPain !== null && worstPain > bestPain) {
        const worstLabel = getPainLabelFromEnum(worstPain);
        const bestLabel = getPainLabelFromEnum(bestPain);
        if (worstLabel && bestLabel) {
          explanations.push({
            cause: formatComparison(worstLabel, bestLabel, 'Pain level', ''),
            explanation: 'Increased discomfort can make it difficult to find comfortable sleeping positions and may cause frequent awakenings, disrupting sleep cycles.'
          });
        }
      }
      
      // Compare activity (sedentary hours)
      const worstSedentary = getValue(worstDay, 'fitbitSedentaryHours');
      const bestSedentary = getValue(bestDay, 'fitbitSedentaryHours');
      if (worstSedentary !== null && bestSedentary !== null && worstSedentary > bestSedentary + 1) {
        explanations.push({
          cause: formatComparison(worstSedentary.toFixed(1), bestSedentary.toFixed(1), 'Sedentary hours', 'hrs'),
          explanation: 'Excessive sedentary time can disrupt circadian rhythms and reduce the body\'s natural drive for restorative sleep, affecting both sleep duration and quality.'
        });
      }
      
      break;
    }
  }
  
  return explanations;
};

