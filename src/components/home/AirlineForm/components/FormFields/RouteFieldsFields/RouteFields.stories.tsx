import { FormProvider, useForm } from "react-hook-form";

import { withMockFlightDateFieldContext } from "@storybook/decorators/FlightDateProviderDecorator";
import {
  bookingFormDefaultValues,
  mockCities,
} from "@/components/home/AirlineForm/__mocks___";

import { RouteFields } from "./RouteFields";

export default {
  title: "Home/AirlineForm/Fields/RouteFields",
  component: RouteFields,
  decorators: [withMockFlightDateFieldContext],
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "RouteFields component renders the origin and destination input fields used in the flight booking form.",
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
