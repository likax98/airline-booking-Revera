import { useForm, FormProvider } from "react-hook-form";

import { withDateFieldContext } from "@storybook/decorators/DateFieldDecorator";
import { bookingFormDefaultValues } from "@/components/home/AirlineForm/__mocks___";

import { FlightTypeField } from "./FlightTypeField";

export default {
  title: "Home/AirlineForm/Fields/FlightTypeField",
  component: FlightTypeField,
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
      <FlightTypeField control={form.control} />
    </FormProvider>
  );
};
