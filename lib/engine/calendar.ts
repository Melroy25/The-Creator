/**
 * CREATOR FLOW: Deterministic Calendar & Date Utilities
 * Timezone-safe pure functions operating on strict YYYY-MM-DD date strings.
 */

import { DateString, WorkCalendar } from './types';

/**
 * Parses YYYY-MM-DD into a UTC date locked at 12:00:00 UTC to prevent timezone shifts.
 */
function parseUTCDate(dateStr: DateString): Date {
  const parts = dateStr.split('-');
  if (parts.length !== 3) {
    throw new Error(`Invalid DateString format: "${dateStr}". Expected YYYY-MM-DD.`);
  }
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);

  if (isNaN(year) || isNaN(month) || isNaN(day)) {
    throw new Error(`Invalid DateString values: "${dateStr}".`);
  }

  return new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
}

/**
 * Formats a UTC Date to YYYY-MM-DD.
 */
function formatUTCDate(d: Date): DateString {
  const year = d.getUTCFullYear();
  const month = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Returns ISO day of week: 1 = Monday, 2 = Tuesday, ..., 7 = Sunday.
 */
export function getIsoDayOfWeek(dateStr: DateString): number {
  const date = parseUTCDate(dateStr);
  const day = date.getUTCDay();
  return day === 0 ? 7 : day;
}

/**
 * Checks whether a given YYYY-MM-DD date is a working day under the calendar.
 */
export function isWorkingDay(dateStr: DateString, calendar: WorkCalendar): boolean {
  const dayOfWeek = getIsoDayOfWeek(dateStr);
  if (!calendar.workingDaysOfWeek.includes(dayOfWeek)) {
    return false;
  }
  if (calendar.holidays && calendar.holidays.includes(dateStr)) {
    return false;
  }
  return true;
}

/**
 * Advances to the next working day on or after `dateStr`.
 * If `dateStr` is already a working day, returns `dateStr`.
 */
export function nextWorkingDay(dateStr: DateString, calendar: WorkCalendar): DateString {
  let current = dateStr;
  let guard = 0;
  while (!isWorkingDay(current, calendar)) {
    const d = parseUTCDate(current);
    d.setUTCDate(d.getUTCDate() + 1);
    current = formatUTCDate(d);
    guard++;
    if (guard > 365) {
      throw new Error(`Calendar has no working days for over 365 days from ${dateStr}`);
    }
  }
  return current;
}

/**
 * Adds N working days to a starting date string.
 * Supports positive, zero, and negative day increments.
 */
export function addWorkingDays(dateStr: DateString, days: number, calendar: WorkCalendar): DateString {
  if (days === 0) {
    return nextWorkingDay(dateStr, calendar);
  }

  const d = parseUTCDate(dateStr);
  const step = days > 0 ? 1 : -1;
  let remaining = Math.abs(days);

  while (remaining > 0) {
    d.setUTCDate(d.getUTCDate() + step);
    const candidate = formatUTCDate(d);
    if (isWorkingDay(candidate, calendar)) {
      remaining--;
    }
  }

  return formatUTCDate(d);
}

/**
 * Computes working days between start and end date (end - start).
 * If start === end, returns 0.
 * If start < end, returns positive working days.
 * If start > end, returns negative working days.
 */
export function workingDaysBetween(startDateStr: DateString, endDateStr: DateString, calendar: WorkCalendar): number {
  if (startDateStr === endDateStr) return 0;

  const isForward = startDateStr < endDateStr;
  let current = isForward ? startDateStr : endDateStr;
  const target = isForward ? endDateStr : startDateStr;

  let count = 0;
  let d = parseUTCDate(current);

  while (current < target) {
    d.setUTCDate(d.getUTCDate() + 1);
    current = formatUTCDate(d);
    if (isWorkingDay(current, calendar)) {
      count++;
    }
  }

  return isForward ? count : -count;
}

/**
 * Utility: returns the earlier of two date strings.
 */
export function minDate(d1: DateString, d2: DateString): DateString {
  return d1 <= d2 ? d1 : d2;
}

/**
 * Utility: returns the later of two date strings.
 */
export function maxDate(d1: DateString, d2: DateString): DateString {
  return d1 >= d2 ? d1 : d2;
}

/**
 * Adds raw calendar days to a date string.
 */
export function addCalendarDays(dateStr: DateString, days: number): DateString {
  const d = parseUTCDate(dateStr);
  d.setUTCDate(d.getUTCDate() + days);
  return formatUTCDate(d);
}
