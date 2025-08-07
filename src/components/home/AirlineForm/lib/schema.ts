import { z } from "zod";

import { ERROR_MESSAGES, FLIGHT_OPTIONS } from "./constants";

const getCitySchema = (cities: string[], message: string) => {
  if (!cities?.length) {
    throw new Error("Cities cannot be empty");
  }

  return z.enum(cities as [string, ...string[]], {
    errorMap: () => ({ message }),
  });
};

export const createBookingFormSchema = (cities: string[]) =>
  z.object({
    origin: getCitySchema(cities, ERROR_MESSAGES.ORIGIN_REQUIRED),
    destination: getCitySchema(cities, ERROR_MESSAGES.DESTINATION_REQUIRED),
    flightTypeOption: z.enum(FLIGHT_OPTIONS as [string, ...string[]]),
    fromDate: z.date({
      required_error: ERROR_MESSAGES.FROM_DATE_REQUIRED,
      invalid_type_error: ERROR_MESSAGES.FROM_DATE_IS_INVALID,
    }),
    toDate: z.date({
      required_error: ERROR_MESSAGES.TO_DATE_REQUIRED,
      invalid_type_error: ERROR_MESSAGES.TO_DATE_IS_INVALID,
    }),
  });
