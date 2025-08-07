import { renderHook } from "@testing-library/react";

import {
  BookingFormValuesType,
  DEFAULT_BOOKING_FORM_VALUES,
  FLIGHT_OPTIONS,
} from "@/components/home/AirlineForm/lib";

import { useQueryToFormInit } from "./useQueryToFormInit";

const [roundTrip] = FLIGHT_OPTIONS;

let mockSearchParams: URLSearchParams;

const mockReset = jest.fn();

jest.mock("next/navigation", () => ({
  useSearchParams: () => mockSearchParams,
}));

const expectDateEquals = (actual: Date, expected: string): void => {
  const [year, month, day] = expected.split("-").map(Number);

  expect(actual.getUTCFullYear()).toBe(year);
  expect(actual.getUTCMonth()).toBe(month - 1);
  expect(actual.getUTCDate()).toBe(day);
};

const expectFieldsToMatch = (
  args: BookingFormValuesType,
  expected: {
    origin: string;
    destination: string;
    type?: string;
    departureDate: string;
    returnDate: string;
  }
): void => {
  expect(args.origin).toBe(expected.origin);
  expect(args.destination).toBe(expected.destination);
  expect(args.flightTypeOption).toBe(expected.type ?? roundTrip);
  expectDateEquals(args.fromDate, expected.departureDate);
  expectDateEquals(args.toDate, expected.returnDate);
};

describe("useQueryToFormInit", () => {
  beforeEach(() => {
    mockReset.mockClear();
  });

  it("resets with hydrated values if all query params are present", () => {
    const data = {
      origin: "Tbilisi",
      destination: "Paris",
      departureDate: "2025-08-20",
      returnDate: "2025-08-28",
      type: roundTrip,
    };

    mockSearchParams = new URLSearchParams(data);

    renderHook(() => {
      useQueryToFormInit(mockReset);
    });

    const args = mockReset.mock.calls[0][0];
    expectFieldsToMatch(args, data);
  });

  it("uses fallback flight type if type param is missing", () => {
    const data = {
      origin: "London",
      destination: "Berlin",
      departureDate: "2025-09-01",
      returnDate: "2025-09-10",
      // not passing type
    };

    mockSearchParams = new URLSearchParams(data);

    renderHook(() => {
      useQueryToFormInit(mockReset);
    });

    const args = mockReset.mock.calls[0][0];
    expectFieldsToMatch(args, data);
  });

  it("resets to default if required fields are missing", () => {
    mockSearchParams = new URLSearchParams();

    renderHook(() => {
      useQueryToFormInit(mockReset);
    });

    expect(mockReset).toHaveBeenCalledTimes(1);
    expect(mockReset).toHaveBeenCalledWith(DEFAULT_BOOKING_FORM_VALUES);
  });
});
