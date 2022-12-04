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

export const getDeadlineDate = (initDate: string) => {
  const date = new Date(initDate);
  const month = date.toLocaleString('default', { month: 'long' });
  const day = date.toLocaleString('default', { day: 'numeric' });
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
};
