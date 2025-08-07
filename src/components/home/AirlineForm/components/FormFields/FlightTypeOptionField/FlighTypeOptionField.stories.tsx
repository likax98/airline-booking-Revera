import { useForm, FormProvider } from "react-hook-form";

import { withMockFlightDateFieldContext } from "@storybook/decorators/FlightDateProviderDecorator";
import { bookingFormDefaultValues } from "@/components/home/AirlineForm/__mocks___";

import { FlightTypeOptionField } from "./FlightTypeOptionField";

export default {
  title: "Home/AirlineForm/Fields/FlightTypeOptionField",
  component: FlightTypeOptionField,
  decorators: [withMockFlightDateFieldContext],
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A radio button form field for selecting flight type",
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
      <FlightTypeOptionField control={form.control} />
    </FormProvider>
  );
};
