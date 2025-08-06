import { useForm } from "react-hook-form";

import { withMockFlightDateFieldContext } from "@storybook/decorators/FlightDateProviderDecorator";
import { destinations } from "@/data";
import { bookingFormDefaultValues } from "@/components/home/AirlineForm/__mocks___";

import { FlightDateCalendar } from "./FlightDateCalendar";

export default {
  title: "Home/AirlineForm/FlightDateCalendar",
  component: FlightDateCalendar,
  decorators: [withMockFlightDateFieldContext],
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "FlightDateCalendar component is a calendar for selecting flight dates.",
      },
    },
  },
};

export const Default = () => {
  const { control, setValue } = useForm({
    defaultValues: bookingFormDefaultValues,
  });

  return (
    <FlightDateCalendar
      // We need force to render it without rely on 'activeDateField' for UI purposes only is Storybook
      className="lg:opacity-100 lg:visible lg:pointer-events-auto"
      {...{ control, destinations, setValue }}
    />
  );
};
