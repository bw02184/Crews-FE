export const date = (dateStr = new Date().toISOString()) => {
  const today = new Date(dateStr);
  today.setHours(today.getHours() + 9);
  return today.toISOString().replaceAll('-', '.').replace('T', ' ').substring(0, 16);
};
