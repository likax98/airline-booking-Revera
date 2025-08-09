import {
  addDays,
  dateToLocalISOString,
  formatDate,
  isBefore,
  isSameDay,
  isValidDate,
  isValidExactDate,
  parseDateFromQuery,
  startOfToday,
  toTimestamp,
} from "./dates";

const invalidDateStr = "Invalid date";

describe("dates", () => {
  describe("formatDate", () => {
    // Jan 2, 2025
    const date = new Date("2025-01-02T00:00:00Z");

    it("formats date using default locale and options", () => {
      // en-GB default: dd/mm/yyyy
      expect(formatDate(date)).toBe("02/01/2025");
    });

    it("formats date using 'en-US' locale", () => {
      // en-US default: mm/dd/yyyy
      expect(
        formatDate(date, "en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
      ).toBe("01/02/2025");
    });

    it("formats date with custom format (long month name)", () => {
      const formatted = formatDate(date, "en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      expect(formatted).toBe("2 January 2025");
    });

    it("formats date with short weekday", () => {
      const formatted = formatDate(date, "en-GB", {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric",
      });

      // Example: "Thu, 02 Jan 2025"
      expect(formatted).toMatch(/^\w{3}, 02 \w{3} 2025$/);
    });
  });

  describe("startOfToday", () => {
    it("returns today’s date with the time set to 00:00", () => {
      const result = startOfToday();
      const now = new Date();
      const expected = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
      );

      expect(result).toEqual(expected);

      // Time is set to 00:00
      expect(result.getHours()).toBe(0);
      expect(result.getMinutes()).toBe(0);
      expect(result.getSeconds()).toBe(0);
      expect(result.getMilliseconds()).toBe(0);
    });

    it("returns a 'new Date' object, not the same instance", () => {
      const result1 = startOfToday();
      const result2 = startOfToday();

      // Different instances
      expect(result1).not.toBe(result2);

      // Same time value
      expect(result1.getTime()).toBe(result2.getTime());
    });
  });

  describe("toTimestamp", () => {
    const dateString = "2025-08-09T12:34:56Z";

    it("converts a date object to timestamp", () => {
      const date = new Date(dateString);

      expect(toTimestamp(date)).toBe(date.getTime());
    });

    it("converts a date string to timestamp", () => {
      const expected = new Date(dateString).getTime();

      expect(toTimestamp(dateString)).toBe(expected);
    });

    it("returns NaN for invalid date string", () => {
      expect(toTimestamp("invalid-date")).toBeNaN();
    });

    it("returns valid timestamp for date string without time", () => {
      const dateString = "2025-08-09";
      const expected = new Date(dateString).getTime();

      expect(toTimestamp(dateString)).toBe(expected);
    });

    it("returns valid timestamp for Date object at epoch", () => {
      const date = new Date(0);
      
      expect(toTimestamp(date)).toBe(0);
    });
  });

  describe("addDays", () => {
    const date = new Date(2025, 7, 5);

    it("adds positive days correctly", () => {
      const result = addDays(date, 3);

      expect(result.getDate()).toBe(8);
      expect(result.getMonth()).toBe(7);
      expect(result.getFullYear()).toBe(2025);
    });

    it("adds negative days correctly", () => {
      const result = addDays(date, -2);

      expect(result.getDate()).toBe(3);
      expect(result.getMonth()).toBe(7);
      expect(result.getFullYear()).toBe(2025);
    });

    it("returns a new date object", () => {
      const result = addDays(date, 1);

      expect(result).not.toBe(date);
    });
  });

  describe("isBefore", () => {
    it("returns true when date is earlier than 'compareDate'", () => {
      const date = new Date(2024, 7, 4);
      const compareDate = new Date(2024, 7, 5);

      expect(isBefore(date, compareDate)).toBe(true);
    });

    it("returns false when date is the same as 'compareDate'", () => {
      const date = new Date(2025, 7, 6);
      const compareDate = new Date(2025, 7, 6);

      expect(isBefore(date, compareDate)).toBe(false);
    });

    it("returns false when date is after 'compareDate'", () => {
      const date = new Date(2025, 7, 8);
      const compareDate = new Date(2025, 7, 7);

      expect(isBefore(date, compareDate)).toBe(false);
    });
  });

  describe("isSameDay", () => {
    it("returns true for identical dates", () => {
      const date = new Date("2025-08-07T10:30:00");
      const compareDate = new Date("2025-08-07T22:00:00"); // same day, different time

      expect(isSameDay(date, compareDate)).toBe(true);
    });

    it("returns false for dates on different days", () => {
      const date = new Date("2025-08-07T23:59:59");
      const compareDate = new Date("2025-08-08T00:00:00");

      expect(isSameDay(date, compareDate)).toBe(false);
    });

    it("returns false for dates in same month and day but different years", () => {
      const date = new Date("2025-08-07");
      const compareDate = new Date("2024-08-07");

      expect(isSameDay(date, compareDate)).toBe(false);
    });

    it("returns false for dates in same year and day but different months", () => {
      const date = new Date("2025-08-07");
      const compareDate = new Date("2025-07-07");

      expect(isSameDay(date, compareDate)).toBe(false);
    });

    it("returns false if one date is invalid", () => {
      const date = new Date("invalid-date");
      const compareDate = new Date("2025-08-07");

      expect(isSameDay(date, compareDate)).toBe(false);
    });
  });

  describe("dateToLocalISOString", () => {
    it("returns empty string if date is undefined", () => {
      expect(dateToLocalISOString(undefined)).toBe("");
    });

    it("formats date with leading zeros for single digit month and day", () => {
      const date = new Date("2025-03-05T00:00:00Z");

      expect(dateToLocalISOString(date)).toBe("2025-03-05");
    });

    it("formats date correctly with double digit month and day", () => {
      const date = new Date("2025-12-25T00:00:00Z");

      expect(dateToLocalISOString(date)).toBe("2025-12-25");
    });
  });

  describe("isValidExactDate", () => {
    it("returns true when date exactly matches the input string", () => {
      const input = "2025-08-20";

      // UTC midnight
      const date = new Date("2025-08-20T00:00:00Z");

      expect(isValidExactDate(input, date)).toBe(true);
    });

    it("returns false when year does not match", () => {
      const input = "2025-08-20";
      const date = new Date("2024-08-20T00:00:00Z");

      expect(isValidExactDate(input, date)).toBe(false);
    });

    it("returns false when month does not match", () => {
      const input = "2025-08-20";
      const date = new Date("2025-07-20T00:00:00Z");

      expect(isValidExactDate(input, date)).toBe(false);
    });

    it("returns false when day does not match", () => {
      const input = "2025-08-20";
      const date = new Date("2025-08-19T00:00:00Z");

      expect(isValidExactDate(input, date)).toBe(false);
    });
  });

  describe("parseDateFromQuery", () => {
    it("returns undefined if value is undefined", () => {
      expect(parseDateFromQuery(undefined)).toBeUndefined();
    });

    it("returns undefined if value is null", () => {
      expect(parseDateFromQuery(null)).toBeUndefined();
    });

    it("returns undefined if value is empty string", () => {
      expect(parseDateFromQuery("")).toBeUndefined();
    });

    test.each(["2025-02-30", "2025-13-01", "2025-00-10", "2025-01-00"])(
      "returns undefined for invalid calendar date '%s'",
      (invalidDate) => {
        expect(parseDateFromQuery(invalidDate)).toBeUndefined();
      }
    );

    test.each(["08/20/2025", "2025-8-20", "2025-08-2", "20250820"])(
      "returns undefined for invalid date format '%s'",
      (invalidFormat) => {
        expect(parseDateFromQuery(invalidFormat)).toBeUndefined();
      }
    );

    it("returns Date object for valid date string", () => {
      const result = parseDateFromQuery("2025-08-20");

      expect(result).toBeInstanceOf(Date);
      expect(result?.toISOString().startsWith("2025-08-20")).toBe(true);
    });
  });

  describe("isValidDate", () => {
    const dateStr = "2025-08-06";

    it("returns true for a valid Date", () => {
      expect(isValidDate(new Date(dateStr))).toBe(true);
    });

    it("returns false for an invalid Date", () => {
      expect(isValidDate(new Date(invalidDateStr))).toBe(false);
    });

    it("returns false for non-Date values", () => {
      expect(isValidDate(dateStr)).toBe(false);
      expect(isValidDate(null)).toBe(false);
      expect(isValidDate(undefined)).toBe(false);
      expect(isValidDate(123456)).toBe(false);
      expect(isValidDate({})).toBe(false);
    });
  });
});
