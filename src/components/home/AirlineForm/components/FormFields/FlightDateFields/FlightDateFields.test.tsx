import { render } from "@testing-library/react";
import { useForm, FormProvider } from "react-hook-form";

import {
  DATE_FIELDS_CONFIG,
  type BookingFormValuesType,
} from "@/components/home/AirlineForm/lib";

import { FlightDateFields } from "./FlightDateFields";

jest.mock("../../../context", () => ({
  useFlightDateField: () => ({
    activeDateField: undefined,
    setActiveDateField: jest.fn(),
  }),
}));

const TestWrapper = (): JSX.Element => {
  const form = useForm<BookingFormValuesType>();

  return (
    <FormProvider {...form}>
      <FlightDateFields />
    </FormProvider>
  );
};

describe("TravelDateFields", () => {
  it("renders correctly", () => {
    const { getByText } = render(<TestWrapper />);

    DATE_FIELDS_CONFIG.forEach(({ label }) => {
      expect(getByText(label)).toBeInTheDocument();
    });
  });
});
