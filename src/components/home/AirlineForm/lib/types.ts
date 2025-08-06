import { FLIGHT_OPTIONS, FormFieldLabel, FormFields } from "./constants";

export type FlightOptionType = (typeof FLIGHT_OPTIONS)[number];

export type BookingFormValuesType = {
  origin: string;
  destination: string;
  flightTypeOption: FlightOptionType;
  fromDate: Date;
  toDate: Date;
};

export interface BookingResultType {
  bookingId: string;
  status: string;
  timestamp: string;
}

export interface RouteFieldConfigType {
  label: FormFieldLabel;
  options: string[];
}

export type RouteFieldLabelType = FormFields.Origin | FormFields.Destination;
export type DateFieldLabelType = FormFieldLabel.From | FormFieldLabel.To;

export type DateFieldConfigType = {
  name: FormFields.FromDate | FormFields.ToDate;
  label: DateFieldLabelType;
};
