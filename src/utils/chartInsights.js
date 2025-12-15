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
    (day.standingTime !== null || day.sedentaryHours !== null)
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
    .filter(day => day.sedentaryHours !== null && day.painLevel !== null)
    .map(day => ({ sedentary: day.sedentaryHours, pain: day.painLevel }));
  
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
export const detectHRStressCorrelation = (dailyData) => {
  const insights = [];
  const loggedDays = dailyData.filter(day => 
    day.restingHeartRate !== null && day.stressLevel !== null
  );

  if (loggedDays.length < 2) return insights;

  const sorted = [...loggedDays].sort((a, b) => a.stressLevel - b.stressLevel);
  const lowStress = sorted.slice(0, Math.ceil(sorted.length / 2));
  const highStress = sorted.slice(Math.floor(sorted.length / 2));
  
  const avgHRLow = average(lowStress.map(d => d.restingHeartRate));
  const avgHRHigh = average(highStress.map(d => d.restingHeartRate));
  
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
 */
export const findBestWorstDays = (dailyData, metric) => {
  const validDays = dailyData.filter(day => day[metric] !== null && day[metric] !== -1);
  if (validDays.length === 0) return { best: null, worst: null };

  const sorted = [...validDays].sort((a, b) => a[metric] - b[metric]);
  return {
    best: sorted[0],
    worst: sorted[sorted.length - 1]
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
    day.sedentaryHours !== null
  );
  
  if (loggedDays.length === 0) return { first: null, last: null };
  
  return {
    first: loggedDays[0],
    last: loggedDays[loggedDays.length - 1]
  };
};

