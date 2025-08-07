import { useForm, FormProvider } from "react-hook-form";

import { withDateFieldContext } from "@storybook/decorators/DateFieldDecorator";
import { bookingFormDefaultValues } from "@/components/home/AirlineForm/__mocks___";

import { FlightTypeOptionField } from "./FlightTypeOptionField";

export default {
  title: "Home/AirlineForm/Fields/FlightTypeOptionField",
  component: FlightTypeOptionField,
  decorators: [withDateFieldContext],
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "The radio buttons group form field for selecting flight type",
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
