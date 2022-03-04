export const formatDate = dateString => {
  if (dateString === undefined) return '';
  const today = new Date();
  const date = new Date(dateString);
  if (today.toDateString() === date.toDateString()) {
    return date.toLocaleTimeString('vi-VN', {
      hour: 'numeric',
      minute: 'numeric',
    });
  }
  return date.toLocaleDateString('vi-VN', {
    weekday: 'short',
    month: 'long',
    day: 'numeric',
  });
};
