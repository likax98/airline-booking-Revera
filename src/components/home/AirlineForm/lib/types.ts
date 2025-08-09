import { z } from "zod";

import { FormFields, FormFieldLabel, FLIGHT_OPTIONS } from "../lib/constants";
import { createBookingFormSchema } from "./schema";

export type BookingFormSchemaType = z.infer<
  ReturnType<typeof createBookingFormSchema>
>;

export type RouteFieldNameType = "origin" | "destination";

export type FlightOptionType = (typeof FLIGHT_OPTIONS)[number];

export type BookingFormValuesType = {
  origin: string;
  destination: string;
  type: FlightOptionType;
  fromDate: Date;
  toDate: Date;
};

export type DateFieldLabelType = FormFieldLabel.From | FormFieldLabel.To;

export type DateFieldConfigType = {
  name: FormFields.FromDate | FormFields.ToDate;
  label: DateFieldLabelType;
};

export type RouteFieldLabelType =
  | FormFieldLabel.Origin
  | FormFieldLabel.Destination;

export type RouteFieldConfigType = {
  label: RouteFieldLabelType;
  options: string[];
};
