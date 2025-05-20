/**
 * Returns the numeric day of the week (1-7) for a given date
 * @param date The date to get the day from
 * @returns Number representing day of week (1 = Monday, 7 = Sunday)
 */
export function getDayOfWeek(date: Date): number {
  // getDay() returns 0-6 where 0 is Sunday
  // We convert it to 1-7 where 1 is Monday
  const day = date.getDay();
  return day === 0 ? 7 : day;
}

