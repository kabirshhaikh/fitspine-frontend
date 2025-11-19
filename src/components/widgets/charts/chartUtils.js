// Shared utilities for chart components

export const getPainLabel = (value) => {
  if (value === null || value === -1) return 'No Data';
  const labels = ['None', 'Mild', 'Moderate', 'Severe'];
  return labels[value] || 'Unknown';
};

export const getTimeLabel = (value) => {
  if (value === null || value === -1) return 'No Data';
  const labels = [
    'Less than 2h',
    '2-4 hours',
    '4-6 hours',
    '6-8 hours',
    'Greater than 8h'
  ];
  return labels[value] || 'Unknown';
};

export const getStressLabel = (value) => {
  if (value === null || value === -1) return 'No Data';
  const labels = ['Very Low', 'Low', 'Moderate', 'High', 'Very High'];
  return labels[value] || 'Unknown';
};

export const calculateAverage = (values) => {
  const validValues = values.filter(v => v !== null && v !== undefined && v !== -1);
  if (validValues.length === 0) return null;
  const sum = validValues.reduce((acc, val) => acc + val, 0);
  return sum / validValues.length;
};

export const calculateTrend = (values, metricName) => {
  const validValues = values.filter(v => v !== null && v !== undefined && v !== -1);
  if (validValues.length < 2) return null;
  
  const midPoint = Math.floor(validValues.length / 2);
  const firstHalf = validValues.slice(0, midPoint);
  const secondHalf = validValues.slice(midPoint);
  
  const firstAvg = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length;
  const secondAvg = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length;
  
  const diff = secondAvg - firstAvg;
  const percentChange = firstAvg !== 0 ? Math.abs((diff / firstAvg) * 100) : 0;
  
  if (percentChange < 5) return { direction: 'stable', change: 0 };
  
  const lowerIsBetter = ['painLevel', 'morningStiffness', 'stressLevel', 'sittingTime', 'sedentaryHours', 'restingHeartRate'].includes(metricName);
  
  if (lowerIsBetter) {
    return { direction: diff < 0 ? 'better' : 'worse', change: percentChange };
  } else {
    return { direction: diff > 0 ? 'better' : 'worse', change: percentChange };
  }
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
};

export const formatDayLabel = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { weekday: 'short' });
};

