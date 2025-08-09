import { FormProvider, useForm } from "react-hook-form";

import { withDateFieldContext } from "@storybook/decorators/DateFieldDecorator";
import {
  bookingFormDefaultValues,
  mockCities,
} from "@/components/home/AirlineForm/__mocks___";

import { RouteFields } from "./RouteFields";

export default {
  title: "Home/AirlineForm/Fields/RouteFields",
  component: RouteFields,
  decorators: [withDateFieldContext],
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "The origin and the destination fields wrapper in the flight booking form",
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
      <RouteFields control={form.control} cities={mockCities} />
    </FormProvider>
  );
};
