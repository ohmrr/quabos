export enum FormatType {
  FullDate = 'f',
  FullDateWithDay = 'F',
  ShortTime = 't',
  LongTime = 'T',
  ShortDateOnly = 'd',
  LongDateOnly = 'D',
  Relative = 'R',
}

export function formatUnixTimestamp(date: Date, format: FormatType) {
  if (!(date instanceof Date)) {
    throw new Error(`Invalid argument: Expected a date.`);
  }

  const timestamp = Math.floor(date.getTime() / 1000);
  return `<t:${timestamp}:${format}>`;
}

export function formatDate(date: Date) {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    timeZone: 'America/Los_Angeles',
  };

  return new Intl.DateTimeFormat('en-US', options).format(date);
}
