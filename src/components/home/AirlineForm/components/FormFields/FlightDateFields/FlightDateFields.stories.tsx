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
          "A wrapper for the return date and the departure date selection fields in the booking form",
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
      <FlightDateFields />
    </FormProvider>
  );
};
