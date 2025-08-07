import { render } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";

import { replaceDashWithSpace } from "@/lib/utils/strings";
import {
  FLIGHT_OPTIONS,
  type BookingFormValuesType,
} from "@/components/home/AirlineForm/lib";

import { FlightTypeOptionField } from "./FlightTypeOptionField";

const TestWrapper = (): JSX.Element => {
  const form = useForm<BookingFormValuesType>();

  return (
    <FormProvider {...form}>
      <FlightTypeOptionField control={form.control} />
    </FormProvider>
  );
};

describe("FlightTypeOptionField", () => {
  it("renders correctly", () => {
    const { getByText } = render(<TestWrapper />);

    FLIGHT_OPTIONS.forEach((option) => {
      const optionText = replaceDashWithSpace(option);

      expect(getByText(optionText)).toBeInTheDocument();
    });
  });
});
