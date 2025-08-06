import { z } from "zod";

import { FLIGHT_OPTIONS } from "./constants";

// Cast to readonly tuple so z.enum() accepts it without repeating literal values
const flightOptions = FLIGHT_OPTIONS as unknown as readonly [string, ...string[]];

const getCitySchema = (cities: string[], message: string) =>
  z.enum(cities as [string, ...string[]], {
    errorMap: () => ({ message }),
  });

export const createBookingFormSchema = (cities: string[]) =>
  z.object({
    origin: getCitySchema(cities, "Origin city is required"),
    destination: getCitySchema(cities, "Destination city is required"),
    flightTypeOption: z.enum(flightOptions),
    fromDate: z.date({
      required_error: "Departure date is required",
      invalid_type_error: "Invalid departure date",
    }),
    toDate: z.date({
      required_error: "Return date is required",
      invalid_type_error: "Invalid return date",
    }),
  });
