// Shared formatting utilities for chart components (no calculations - all data comes from backend)

export const getTimeLabel = (value) => {
  if (value === null || value === -1 || value === undefined) return 'No Data';
  const labels = [
    'Less than 2h',
    '2-4 hours',
    '4-6 hours',
    '6-8 hours',
    'Greater than 8h'
  ];
  return labels[value] || 'Unknown';
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
};

export const formatDayLabel = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { weekday: 'short' });
};
