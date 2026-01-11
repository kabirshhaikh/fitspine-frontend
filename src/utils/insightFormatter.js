/**
 * Utility functions to format insight metric values for better readability
 */

/**
 * Format minutes to hours for display
 * @param {number} minutes - Value in minutes
 * @returns {string} Formatted string like "2 hours" or "2.5 hours"
 */
export const formatMinutesToHours = (minutes) => {
  if (minutes === null || minutes === undefined || isNaN(minutes)) return 'No data';
  const hours = minutes / 60;
  if (hours === 0) return '0 hours';
  if (hours === 1) return '1 hour';
  // If it's a whole number, don't show decimals
  if (hours % 1 === 0) return `${hours} hours`;
  // Otherwise show 1 decimal place
  return `${hours.toFixed(1)} hours`;
};

/**
 * Format a metric value based on its type
 * @param {string} metricName - Name of the metric (e.g., "sleepDuration", "sedentaryMinutes")
 * @param {number|string} value - The value to format
 * @returns {string} Formatted value string
 */
export const formatMetricValue = (metricName, value) => {
  if (value === null || value === undefined || value === '') return 'No data';
  
  const metricLower = metricName ? metricName.toLowerCase() : '';
  
  // Convert numeric strings to numbers
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(numValue)) return value; // Return as-is if not a number
  
  // Format based on metric type
  // For sleep duration and sedentary minutes, if value is > 10, assume it's in minutes
  if (metricLower.includes('sleepduration') || metricLower === 'sleepduration' || metricLower === 'sleep duration') {
    // Sleep duration: if value > 10, assume minutes and convert to hours
    // Values like 120 (minutes) should become "2 hours"
    // Values <= 10 are ambiguous, but since backend sends 120 as minutes, we'll convert any number > 2
    if (numValue > 2) {
      return formatMinutesToHours(numValue);
    }
    return `${numValue} ${numValue === 1 ? 'hour' : 'hours'}`;
  }
  
  if (metricLower.includes('sedentary') && (metricLower.includes('minute') || metricLower.includes('min'))) {
    // Sedentary minutes: always convert to hours (values are typically > 60)
    return formatMinutesToHours(numValue);
  }
  
  // For other metrics, return as-is (but could extend this for other types)
  return String(value);
};

/**
 * Format a metric comparison string to be more readable
 * Examples:
 * - "sleepDuration: 120 today | 120 typical | 0" -> "Sleep Duration: 2 hours today | 2 hours typical (no change)"
 * - "sedentaryMinutes: 723 today | 374 typical | +349" -> "Sedentary Time: 12.1 hours today | 6.2 hours typical (+5.8 hours)"
 * @param {string} comparisonString - The comparison string to format
 * @returns {string} Formatted comparison string
 */
export const formatMetricComparison = (comparisonString) => {
  if (!comparisonString || typeof comparisonString !== 'string') return comparisonString;
  
  // Pattern 1: "metricName: value today | value typical | delta"
  // Pattern 2: "value today | value typical | delta"
  
  let metricName = '';
  let restOfString = comparisonString.trim();
  
  // Check if there's a metric name prefix (e.g., "sleepDuration:")
  const colonIndex = restOfString.indexOf(':');
  if (colonIndex > 0) {
    metricName = restOfString.substring(0, colonIndex).trim();
    restOfString = restOfString.substring(colonIndex + 1).trim();
  }
  
  // Parse the comparison: "value today | value typical | delta"
  const parts = restOfString.split('|').map(p => p.trim());
  if (parts.length < 2) return comparisonString; // Can't parse, return as-is
  
  const todayPart = parts[0].replace(/today/gi, '').trim();
  const typicalPart = parts[1].replace(/typical/gi, '').trim();
  const deltaPart = parts.length > 2 ? parts[2].trim() : null;
  
  // Extract numeric values
  const todayMatch = todayPart.match(/-?\d+\.?\d*/);
  const typicalMatch = typicalPart.match(/-?\d+\.?\d*/);
  const deltaMatch = deltaPart ? deltaPart.match(/-?\d+\.?\d*/) : null;
  
  if (!todayMatch || !typicalMatch) return comparisonString; // Can't parse numbers
  
  const todayValue = parseFloat(todayMatch[0]);
  const typicalValue = parseFloat(typicalMatch[0]);
  const deltaValue = deltaMatch ? parseFloat(deltaMatch[0]) : (todayValue - typicalValue);
  
  // Format values based on metric type
  const formattedToday = formatMetricValue(metricName, todayValue);
  const formattedTypical = formatMetricValue(metricName, typicalValue);
  
  // Format delta
  let formattedDelta = '';
  if (deltaValue !== null && !isNaN(deltaValue)) {
    if (deltaValue === 0) {
      formattedDelta = ' (no change)';
    } else {
      const deltaFormatted = formatMetricValue(metricName, Math.abs(deltaValue));
      const sign = deltaValue > 0 ? '+' : '-';
      formattedDelta = ` (${sign}${deltaFormatted})`;
    }
  }
  
  // Format metric name for display
  let displayMetricName = '';
  if (metricName) {
    // Convert camelCase or snake_case to Title Case
    displayMetricName = metricName
      .replace(/([A-Z])/g, ' $1')
      .replace(/_/g, ' ')
      .replace(/^\w/, c => c.toUpperCase())
      .trim();
    
    // Common replacements for better readability
    displayMetricName = displayMetricName
      .replace(/Sleep Duration/gi, 'Sleep Duration')
      .replace(/Sedentary Minutes/gi, 'Sedentary Time')
      .replace(/Sedentary Min/gi, 'Sedentary Time')
      .replace(/Night Wake Ups/gi, 'Night Wake-ups')
      .replace(/Night WakeUps/gi, 'Night Wake-ups');
    
    displayMetricName = displayMetricName + ': ';
  }
  
  return `${displayMetricName}${formattedToday} today | ${formattedTypical} typical${formattedDelta}`;
};

/**
 * Format flare-up trigger value strings
 * @param {string} metricName - Name of the metric
 * @param {string} valueString - The value string like "723 today | 374 typical | +349"
 * @returns {string} Formatted value string
 */
export const formatFlareUpTriggerValue = (metricName, valueString) => {
  if (!valueString || typeof valueString !== 'string') return valueString;
  
  // Parse: "723 today | 374 typical | +349"
  const parts = valueString.split('|').map(p => p.trim());
  if (parts.length < 2) return valueString;
  
  const todayMatch = parts[0].match(/-?\d+\.?\d*/);
  const typicalMatch = parts[1].match(/-?\d+\.?\d*/);
  const deltaPart = parts.length > 2 ? parts[2].trim() : null;
  
  if (!todayMatch || !typicalMatch) return valueString;
  
  const todayValue = parseFloat(todayMatch[0]);
  const typicalValue = parseFloat(typicalMatch[0]);
  const deltaMatch = deltaPart ? deltaPart.match(/-?\d+\.?\d*/) : null;
  const deltaValue = deltaMatch ? parseFloat(deltaMatch[0]) : (todayValue - typicalValue);
  
  // Format values
  const formattedToday = formatMetricValue(metricName, todayValue);
  const formattedTypical = formatMetricValue(metricName, typicalValue);
  
  // Format delta
  let formattedDelta = '';
  if (deltaValue !== null && !isNaN(deltaValue) && deltaValue !== 0) {
    const deltaFormatted = formatMetricValue(metricName, Math.abs(deltaValue));
    const sign = deltaValue > 0 ? '+' : '-';
    formattedDelta = ` (${sign}${deltaFormatted})`;
  } else if (deltaValue === 0) {
    formattedDelta = ' (no change)';
  }
  
  return `${formattedToday} today | ${formattedTypical} typical${formattedDelta}`;
};
