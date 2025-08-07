import { renderHook } from "@testing-library/react";

import {
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

    expect(mockReset).toHaveBeenCalledTimes(1);

    const args = mockReset.mock.calls[0][0];

    expect(args.origin).toBe(data.origin);
    expect(args.destination).toBe(data.destination);
    expect(args.flightTypeOption).toBe(data.type);

    expect(args.fromDate.getUTCFullYear()).toBe(2025);
    expect(args.fromDate.getUTCMonth()).toBe(7);
    expect(args.fromDate.getUTCDate()).toBe(20);

    expect(args.toDate.getUTCFullYear()).toBe(2025);
    expect(args.toDate.getUTCMonth()).toBe(7);
    expect(args.toDate.getUTCDate()).toBe(28);
  });

  it("uses fallback flight type if type param is missing", () => {
    const data = {
      origin: "London",
      destination: "Berlin",
      departureDate: "2025-09-01",
      returnDate: "2025-09-10",
      // not passing flight type
    };

    mockSearchParams = new URLSearchParams(data);

    renderHook(() => {
      useQueryToFormInit(mockReset);
    });

    expect(mockReset).toHaveBeenCalledTimes(1);

    const args = mockReset.mock.calls[0][0];

    expect(args.origin).toBe(data.origin);
    expect(args.destination).toBe(data.destination);
    expect(args.flightTypeOption).toBe(roundTrip);

    expect(args.fromDate.getUTCFullYear()).toBe(2025);
    expect(args.fromDate.getUTCMonth()).toBe(8);
    expect(args.fromDate.getUTCDate()).toBe(1);

    expect(args.toDate.getUTCFullYear()).toBe(2025);
    expect(args.toDate.getUTCMonth()).toBe(8);
    expect(args.toDate.getUTCDate()).toBe(10);
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
