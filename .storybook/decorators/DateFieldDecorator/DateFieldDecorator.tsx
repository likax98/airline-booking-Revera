import type { Decorator, ReactRenderer } from "@storybook/react";
import { FlightDateFieldProvider } from "@/components/home/AirlineForm/context";

export const withDateFieldContext: Decorator<ReactRenderer> = (Story) => (
  <FlightDateFieldProvider>
    <Story />
  </FlightDateFieldProvider>
);