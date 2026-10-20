import { describe, expect, it } from 'vitest';
import {
  addCalendarDays,
  addWorkingDays,
  getIsoDayOfWeek,
  isWorkingDay,
  maxDate,
  minDate,
  nextWorkingDay,
  workingDaysBetween,
} from '../../lib/engine/calendar';
import { WorkCalendar } from '../../lib/engine/types';

describe('Engine: Calendar and Date Math', () => {
  const standardCalendar: WorkCalendar = {
    workingDaysOfWeek: [1, 2, 3, 4, 5], // Monday - Friday
    holidays: ['2026-04-17'], // Good Friday holiday
  };

  it('correctly identifies ISO day of week (1=Mon ... 7=Sun)', () => {
    expect(getIsoDayOfWeek('2026-04-13')).toBe(1); // Monday
    expect(getIsoDayOfWeek('2026-04-14')).toBe(2); // Tuesday
    expect(getIsoDayOfWeek('2026-04-17')).toBe(5); // Friday
    expect(getIsoDayOfWeek('2026-04-18')).toBe(6); // Saturday
    expect(getIsoDayOfWeek('2026-04-19')).toBe(7); // Sunday
  });

  it('checks working days and accounts for holidays', () => {
    expect(isWorkingDay('2026-04-13', standardCalendar)).toBe(true); // Monday
    expect(isWorkingDay('2026-04-18', standardCalendar)).toBe(false); // Saturday
    expect(isWorkingDay('2026-04-19', standardCalendar)).toBe(false); // Sunday
    expect(isWorkingDay('2026-04-17', standardCalendar)).toBe(false); // Friday Holiday
  });

  it('advances to next working day skipping weekends and holidays', () => {
    // If already working day, returns same day
    expect(nextWorkingDay('2026-04-13', standardCalendar)).toBe('2026-04-13');

    // Friday 2026-04-17 is holiday -> advances to Monday 2026-04-20
    expect(nextWorkingDay('2026-04-17', standardCalendar)).toBe('2026-04-20');

    // Saturday 2026-04-18 -> advances to Monday 2026-04-20
    expect(nextWorkingDay('2026-04-18', standardCalendar)).toBe('2026-04-20');
  });

  it('adds working days correctly across weekends and holidays', () => {
    // Mon 2026-04-13 + 1 working day = Tue 2026-04-14
    expect(addWorkingDays('2026-04-13', 1, standardCalendar)).toBe('2026-04-14');

    // Thu 2026-04-16 + 1 working day (Fri 17 is holiday, Sat/Sun off) = Mon 2026-04-20
    expect(addWorkingDays('2026-04-16', 1, standardCalendar)).toBe('2026-04-20');

    // Mon 2026-04-13 + 5 working days (Tue, Wed, Thu, Mon, Tue) = Tue 2026-04-21
    expect(addWorkingDays('2026-04-13', 5, standardCalendar)).toBe('2026-04-21');
  });

  it('supports negative working day offsets', () => {
    // Mon 2026-04-20 - 1 working day (Fri 17 holiday) = Thu 2026-04-16
    expect(addWorkingDays('2026-04-20', -1, standardCalendar)).toBe('2026-04-16');
  });

  it('calculates working days between two dates', () => {
    // Same day
    expect(workingDaysBetween('2026-04-13', '2026-04-13', standardCalendar)).toBe(0);

    // Mon 13 to Thu 16 = 3 working days (14, 15, 16)
    expect(workingDaysBetween('2026-04-13', '2026-04-16', standardCalendar)).toBe(3);

    // Mon 13 to Mon 20 with Fri 17 as holiday = 4 working days (14, 15, 16, 20)
    expect(workingDaysBetween('2026-04-13', '2026-04-20', standardCalendar)).toBe(4);

    // Reverse direction yields negative value
    expect(workingDaysBetween('2026-04-20', '2026-04-13', standardCalendar)).toBe(-4);
  });

  it('provides minDate and maxDate correctly', () => {
    expect(minDate('2026-04-10', '2026-04-15')).toBe('2026-04-10');
    expect(maxDate('2026-04-10', '2026-04-15')).toBe('2026-04-15');
    expect(addCalendarDays('2026-04-13', 7)).toBe('2026-04-20');
  });
});
