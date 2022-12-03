export const getDate = () => {
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
  const currentDay = currentDate.toLocaleString('default', { day: 'numeric' });
  const currentYear = currentDate.getFullYear();
  const withPmAm = currentDate.toLocaleTimeString('default', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return `${currentMonth} ${currentDay}, ${currentYear} ${withPmAm}`;
};
