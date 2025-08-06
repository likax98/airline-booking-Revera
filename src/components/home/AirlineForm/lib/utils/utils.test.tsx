import { addDays, formatDate, isBefore, startOfToday } from "@/lib/utils/dates";
import { destinations } from "@/data";
import { DAYS_OF_WEEK_INDEXES } from "@/lib/constants";

import {
  DATE_FIELDS_CONFIG,
  DEFAULT_BOOKING_FORM_VALUES,
  FLIGHT_OPTIONS,
  FormFieldLabel,
  FormFields,
  MESSAGES,
} from "../../lib";
import {
  setSelectedFlightDate,
  getDisabledFlightDates,
  getNextFlightDate,
  getDateAriaLabel,
  getRoutesConfig,
  getCalendarWarningMessage,
  getDefaultValuesFromSearchParams,
} from "./utils";

const [roundTrip] = FLIGHT_OPTIONS;
const sharedParams = {
  origin: "Paris",
  destination: "London",
};

describe("setSelectedFlightDate", () => {
  const mockSetFromDate = jest.fn();
  const mockSetToDate = jest.fn();

  const date = new Date("2025-01-01");
  const [fromDate] = DATE_FIELDS_CONFIG;

  beforeEach(() => jest.clearAllMocks());

  it("calls 'setFromDate' when 'activeField' matches 'fromDate' label", () => {
    setSelectedFlightDate(mockSetFromDate, mockSetToDate, date, fromDate.label);

    expect(mockSetFromDate).toHaveBeenCalledWith(date);
    expect(mockSetToDate).not.toHaveBeenCalled();
  });

  it("calls 'setToDate' when 'activeField' does not match 'fromDate' label", () => {
    setSelectedFlightDate(
      mockSetFromDate,
      mockSetToDate,
      date,
      FormFieldLabel.To
    );

    expect(mockSetToDate).toHaveBeenCalledWith(date);
    expect(mockSetFromDate).not.toHaveBeenCalled();
  });

  it("does nothing when date is undefined", () => {
    setSelectedFlightDate(
      mockSetFromDate,
      mockSetToDate,
      undefined,
      fromDate.label
    );

    expect(mockSetFromDate).not.toHaveBeenCalled();
    expect(mockSetToDate).not.toHaveBeenCalled();
  });

  it("does nothing when 'activeField' is undefined", () => {
    setSelectedFlightDate(mockSetFromDate, mockSetToDate, date, undefined);

    expect(mockSetFromDate).not.toHaveBeenCalled();
    expect(mockSetToDate).not.toHaveBeenCalled();
  });
});

describe("getDisabledFlightDates", () => {
  const today = startOfToday();

  it("returns true for all dates if no 'destination' is provided", () => {
    const isDisabled = getDisabledFlightDates(destinations, undefined);

    expect(isDisabled(today)).toBe(true);
    expect(isDisabled(addDays(today, 1))).toBe(true);
  });

  it("disables dates before today if 'minDate' is not set", () => {
    const yesterday = addDays(today, -1);

    const isDisabled = getDisabledFlightDates(
      destinations,
      destinations[0].city
    );

    expect(isDisabled(yesterday)).toBe(true);
  });

  it("disables dates before custom 'minDate' if provided", () => {
    const customMin = addDays(today, 3);

    const isDisabled = getDisabledFlightDates(
      destinations,
      destinations[0].city,
      customMin
    );

    const dayBeforeMin = addDays(today, 2);
    const minDay = addDays(today, 3);

    expect(isDisabled(dayBeforeMin)).toBe(true);
    expect(isDisabled(minDay)).toBe(false);
  });

  it("disables dates not matching available weekdays", () => {
    const [, country] = destinations;
    const { availableWeekdays } = country;

    const isDisabled = getDisabledFlightDates([country], country.city);

    for (let i = 0; i < DAYS_OF_WEEK_INDEXES.length; i++) {
      const date = addDays(today, i);
      const weekday = date.getDay();

      const shouldBeDisabled =
        isBefore(date, today) || !availableWeekdays.includes(weekday);

      expect(isDisabled(date)).toBe(shouldBeDisabled);
    }
  });
});

describe("getNextFlightDate", () => {
  it("returns undefined if no city is provided", () => {
    const result = getNextFlightDate(destinations);

    expect(result).toBeUndefined();
  });

  it("returns the next enabled date for each city", () => {
    for (const { city } of destinations) {
      const isDisabled = getDisabledFlightDates(destinations, city);

      let expected = startOfToday();

      while (isDisabled(expected)) {
        expected = addDays(expected, 1);
      }

      const result = getNextFlightDate(destinations, city);
      expect(result).toEqual(expected);
    }
  });
});

describe("getDateAriaLabel", () => {
  it("returns correct label when date is selected", () => {
    const label = FormFieldLabel.From;
    const date = new Date("2025-08-05");

    const result = getDateAriaLabel(label, date);

    expect(result).toBe(`${label} date selected: ${formatDate(date)}`);
  });

  it("returns correct label when no date is selected", () => {
    const label = FormFieldLabel.To;

    const result = getDateAriaLabel(label);

    expect(result).toBe(`Select ${label.toLowerCase()} date`);
  });
});

describe("getRoutesConfig", () => {
  const cities = ["Paris", "London", "New York"];
  const [paris, london, newYork] = cities;

  it("excludes destination from origin options", () => {
    const config = getRoutesConfig({ cities, destination: london });

    const originOptions = config.find(
      ({ label }) => label === FormFieldLabel.Origin
    )?.options;

    expect(originOptions).toEqual([paris, newYork]);
  });

  it("excludes origin from destination options when origin is defined", () => {
    const config = getRoutesConfig({ cities, origin: paris });

    const destinationOptions = config.find(
      ({ label }) => label === FormFieldLabel.Destination
    )?.options;

    expect(destinationOptions).toEqual([london, newYork]);
  });

  it("returns empty destination options when origin is not defined", () => {
    const config = getRoutesConfig({ cities });

    const destinationOptions = config.find(
      ({ label }) => label === FormFieldLabel.Destination
    )?.options;

    expect(destinationOptions).toEqual([]);
  });
});

describe("getCalendarWarningMessage", () => {
  it("returns origin/destination warning if either is missing", () => {
    expect(
      getCalendarWarningMessage({
        origin: "",
        destination: sharedParams.origin,
      })
    ).toBe(MESSAGES.SELECT_ORIGIN_AND_DESTINATION);

    expect(
      getCalendarWarningMessage({
        origin: sharedParams.origin,
        destination: "",
      })
    ).toBe(MESSAGES.SELECT_ORIGIN_AND_DESTINATION);
  });

  it("returns date field warning if activeDateField is missing", () => {
    expect(
      getCalendarWarningMessage({
        ...sharedParams,
        activeDateField: undefined,
      })
    ).toBe(MESSAGES.SELECT_DATE_FIELD);
  });

  it("returns null if all values are present", () => {
    expect(
      getCalendarWarningMessage({
        ...sharedParams,
        activeDateField: "fromDate",
      })
    ).toBeNull();
  });
});

describe("getDefaultValuesFromSearchParams", () => {
  it("returns default values when params is null", () => {
    const result = getDefaultValuesFromSearchParams(null);

    expect(result).toEqual(DEFAULT_BOOKING_FORM_VALUES);
  });

  it("uses provided values from search params", () => {
    const params = new URLSearchParams({
      [FormFields.Origin]: sharedParams.origin,
      [FormFields.Destination]: sharedParams.destination,
      [FormFields.FlightTypeOption]: roundTrip,
      [FormFields.FromDate]: "2025-08-10",
      [FormFields.ToDate]: "2025-08-12",
    });

    const result = getDefaultValuesFromSearchParams(params);

    expect(result.origin).toBe(sharedParams.origin);
    expect(result.destination).toBe(sharedParams.destination);
    expect(result.flightTypeOption).toBe(roundTrip);
    expect(result.fromDate).toEqual(new Date("2025-08-10"));
    expect(result.toDate).toEqual(new Date("2025-08-12"));
  });

  it("falls back to default values if params are missing", () => {
    const params = new URLSearchParams({
      [FormFields.Origin]: "",
      [FormFields.FlightTypeOption]: "",
    });

    const result = getDefaultValuesFromSearchParams(params);

    expect(result.origin).toBe(DEFAULT_BOOKING_FORM_VALUES.origin);
    expect(result.destination).toBe(DEFAULT_BOOKING_FORM_VALUES.destination);
    expect(result.flightTypeOption).toBe(
      DEFAULT_BOOKING_FORM_VALUES.flightTypeOption
    );
    expect(result.fromDate).toEqual(DEFAULT_BOOKING_FORM_VALUES.fromDate);
    expect(result.toDate).toEqual(DEFAULT_BOOKING_FORM_VALUES.toDate);
  });
});
