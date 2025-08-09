import { renderHook } from "@testing-library/react";

import {
  BookingFormValuesType,
  DEFAULT_BOOKING_FORM_VALUES,
  FLIGHT_OPTIONS,
} from "@/components/home/AirlineForm/lib";

import { useQueryToFormInit } from "./useQueryToFormInit";

const [ROUND_TRIP] = FLIGHT_OPTIONS;

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
  expect(args.type).toBe(expected.type ?? ROUND_TRIP);
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
      type: ROUND_TRIP,
      departureDate: "2025-08-20",
      returnDate: "2025-08-28",
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
