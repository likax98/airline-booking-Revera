/**
 * Formats a date object into a localized string using Intl.DateTimeFormat
 *
 * @param {Date} date - The date to format
 * @param {string} [locale='en-GB'] - Optional locale string
 * @param {Intl.DateTimeFormatOptions} [options] - Optional formatting options
 * Defaults to day/month/year as 2-digit numeric values
 *
 * @returns {string} The formatted date string or empty string
 */
export const formatDate = (
  date: Date | string,
  locale: string = "en-GB",
  options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }
): string => {
  const parsed = typeof date === "string" ? new Date(date) : date;

  if (isNaN(parsed.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat(locale, options).format(parsed);
};

/**
 * Returns a date object, the start of the current day (midnight)
 *
 * @returns {Date} A Date set to 00:00:00 of today
 */
export const startOfToday = (): Date => {
  const now = new Date();

  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
};

/**
 * Converts a date string or date object into a timestamp
 *
 * @param {string | Date} date - The date to convert. Can be a Date object or a date string parsable by "Date"
 * @returns {number} The timestamp representing the date in milliseconds
 */
export const toTimestamp = (date: string | Date): number =>
  new Date(date).getTime();

/**
 * Returns a date Object with a specified number of days added
 *
 * @param {Date} date - The base date
 * @param {number} amount - The number of days to add (can be negative)
 *
 * @returns {Date} A new Date with the added days
 */
export const addDays = (date: Date, amount: number): Date => {
  const result = new Date(date);

  result.setDate(result.getDate() + amount);

  return result;
};

/**
 * Checks if a date comes is before another date
 *
 * @param {Date} date - The date to compare
 * @param {Date} compareDate - The reference date to compare against
 *
 * @returns {boolean} True if "date" is before "compareDate", otherwise false
 */
export const isBefore = (date: Date, compareDate: Date): boolean =>
  toTimestamp(date) < toTimestamp(compareDate);

/**
 * Checks if two dates fall on the same calendar day
 *
 * @param date - The first date to compare
 * @param compareDate - The second date to compare
 *
 * @returns `true` if both dates are on the same calendar day, otherwise "false"
 */
export const isSameDay = (date: Date, compareDate: Date): boolean =>
  date.getFullYear() === compareDate.getFullYear() &&
  date.getMonth() === compareDate.getMonth() &&
  date.getDate() === compareDate.getDate();

/**
 * Converts a Date object into a local ISO 8601 date string "YYYY-MM-DD"
 *
 * @param {Date | undefined} date - The date to convert
 *
 * @returns {string} The formatted ISO date string (`YYYY-MM-DD`), or an empty string if no date is provided
 */
export const dateToLocalISOString = (date?: Date): string => {
  if (!date) {
    return "";
  }

  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");

  return `${year}-${month}-${day}`;
};

/**
 * Validates that the provided Date object exactly matches the year, month, and day
 * This is used to ensure that the Date object did not auto-correct an invalid date
 *
 * @param {string} input - The date string in "YYYY-MM-DD" format
 * @param {Date} date - The Date object to validate against the input string
 *
 * @returns {boolean} True if the Date matches the input's year, month, and day exactly; otherwise, false
 */
export const isValidExactDate = (input: string, date: Date): boolean => {
  const [yearStr, monthStr, dayStr] = input.split("-");
  const year = Number(yearStr);
  const month = Number(monthStr);
  const day = Number(dayStr);

  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() + 1 === month &&
    date.getUTCDate() === day
  );
};

/**
 * Parses a date string from a query parameter into a valid Date object
 *
 * @param {string | null | undefined} value - The date string to parse
 *
 * @returns {Date | undefined} A valid Date object if parsing succeeds, otherwise undefined
 */
export const parseDateFromQuery = (value?: string | null): Date | undefined => {
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  if (!value || !datePattern.test(value)) {
    return undefined;
  }

  const timestamp = toTimestamp(value);
  if (isNaN(timestamp)) {
    return undefined;
  }

  const date = new Date(timestamp);

  if (!isValidExactDate(value, date)) {
    return undefined;
  }

  return date;
};

/**
 * Checks if a given value is a valid Date object
 *
 * @param {unknown} value - The value to check
 *
 * @returns {value is Date} True if the value is a Date instance and not NaN; otherwise, false
 */
export const isValidDate = (value: unknown): value is Date =>
  value instanceof Date && !isNaN(value.getTime());
