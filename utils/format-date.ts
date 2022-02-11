const dateTimeFormatter = new Intl.DateTimeFormat('en-US', {
  // weekday: 'long',
  year: 'numeric',
  month: 'short',
  day: '2-digit',
  timeZone: 'PST',
  timeZoneName: 'short',
});

export function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return dateTimeFormatter.format(date);
}
