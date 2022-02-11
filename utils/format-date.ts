export function formatDate(dateStr: string) {
  const dateTimeFormatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    timeZone: 'UST',
    timeZoneName: 'short',
  });

  const date = new Date(dateStr);
  return dateTimeFormatter.format(date);
}
