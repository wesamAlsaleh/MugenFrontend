/**
 * Convert Unix timestamp in seconds to a readable date string.
 *
 * @param seconds - Unix timestamp in seconds
 * @returns Date string in the format "Weekday" (e.g., "Monday")
 */
export function secondsToWeekDay(seconds: number): string {
  // Convert the airingAt timestamp to a Date object by multiplying by 1000
  const airingDate = new Date(seconds * 1000);

  // Format it for display (using toLocaleString) and return it
  return airingDate.toLocaleString("en-US", {
    weekday: "long",
  });
}

/**
 * Convert Unix timestamp in seconds to a readable date string.
 * @param seconds - Unix timestamp in seconds
 * @returns Date string in the format "DD MMM" (e.g., "25 Dec")
 */
export function secondsToDate(seconds: number): string {
  // Convert the airingAt timestamp to a Date object by multiplying by 1000
  const date = new Date(seconds * 1000);

  // Format it for display (using toLocaleString) and return it
  return date.toLocaleString("en-US", {
    day: "2-digit",
    month: "short",
  });
}
