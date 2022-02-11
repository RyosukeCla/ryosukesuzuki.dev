export function formatDate(dateStr: string) {
  const dateTimeFormatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    timeZone: 'PST8PDT',
    timeZoneName: 'short',
  });

  const date = new Date(dateStr);
  return dateTimeFormatter.format(date);
}
