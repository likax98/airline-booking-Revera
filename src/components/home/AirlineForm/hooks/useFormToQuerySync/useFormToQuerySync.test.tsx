import { act } from "react";
import { renderHook } from "@testing-library/react";
import { useForm } from "react-hook-form";

import {
  FLIGHT_OPTIONS,
  FormFields,
  type BookingFormValuesType,
} from "@/components/home/AirlineForm/lib";

import { useFormToQuerySync } from "./useFormToQuerySync";

const [roundTrip] = FLIGHT_OPTIONS;
const sharedProps = {
  fromDate: new Date("2025-10-01"),
  toDate: new Date("2025-10-15"),
  flightTypeOption: roundTrip,
};

const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe("useFormToQuerySync", () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  const setup = (defaultValues: Partial<BookingFormValuesType> = {}) =>
    renderHook(() => {
      const methods = useForm<BookingFormValuesType>({
        defaultValues,
      });

      useFormToQuerySync(methods.control);

      return methods;
    });

  it("pushes query to URL on valid form change", () => {
    const origin = "Rome";
    const destination = "Tokyo";

    const query = `?origin=${origin}&destination=${destination}&departureDate=2025-10-01&returnDate=2025-10-15&type=${roundTrip}`;

    const { result } = setup({
      origin,
      destination,
      ...sharedProps,
    });

    act(() => {
      result.current.setValue(FormFields.Origin, origin);
      result.current.setValue(FormFields.Destination, destination);
      result.current.setValue(FormFields.FromDate, sharedProps.fromDate);
      result.current.setValue(FormFields.ToDate, sharedProps.toDate);
      result.current.setValue(FormFields.FlightTypeOption, roundTrip);
    });

    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith(query);
  });

  it("does not push URL if values are unchanged", () => {
    const origin = "Paris";
    const destination = "Berlin";

    const { result } = setup({
      origin,
      destination,
      ...sharedProps,
    });

    act(() => {
      result.current.setValue(FormFields.Origin, origin);
    });

    expect(mockPush).toHaveBeenCalledTimes(1);

    act(() => {
      result.current.setValue(FormFields.Origin, origin);
    });

    expect(mockPush).toHaveBeenCalledTimes(1);
  });

  it("skips syncing when form is incomplete", () => {
    setup({
      origin: "New York",
      destination: "",
      fromDate: undefined,
      toDate: undefined,
      flightTypeOption: FLIGHT_OPTIONS[0],
    });

    expect(mockPush).not.toHaveBeenCalledTimes(1);
  });
});
