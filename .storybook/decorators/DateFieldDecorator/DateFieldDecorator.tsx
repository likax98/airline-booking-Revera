import type { Decorator } from "@storybook/react";
import { FlightDateFieldProvider } from "@/components/home/AirlineForm/context";

export const withDateFieldContext: Decorator = (Story): React.ReactElement => (
  <FlightDateFieldProvider>
    <Story />
  </FlightDateFieldProvider>
);
