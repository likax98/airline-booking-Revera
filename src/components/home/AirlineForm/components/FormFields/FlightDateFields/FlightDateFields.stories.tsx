import { FormProvider, useForm } from "react-hook-form";

import { withMockFlightDateFieldContext } from "@storybook/decorators/FlightDateProviderDecorator";
import { bookingFormDefaultValues } from "@/components/home/AirlineForm/__mocks___";

import { FlightDateFields } from "./FlightDateFields";

export default {
  title: "Home/AirlineForm/Fields/FlightDateFields",
  component: FlightDateFields,
  decorators: [withMockFlightDateFieldContext],
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "FlightDateFields component renders the 'From' and 'To' date selection fields in the flight booking form. It handles user interaction.",
      },
    },
  },
};

export const Default = () => {
  const form = useForm({
    defaultValues: bookingFormDefaultValues,
  });

  return (
    <FormProvider {...form}>
      <FlightDateFields control={form.control} />
    </FormProvider>
  );
};
