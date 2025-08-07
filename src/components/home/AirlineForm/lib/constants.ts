import { BookingFormValuesType, DateFieldConfigType } from "./types";

export const FLIGHT_OPTIONS = ["round-trip", "one-way"];

// Labels
export const LABELS = {
  BOOK_FLIGHT: "Book Flight",
  BOOKING_FLIGHT: "Booking",
  RESET: "Reset",
};

// Aria Labels
export const ARIA_LABELS = {
  CLOSE_CALENDAR: "Close Calendar",
};

// Messages
export const MESSAGES = {
  BOOKING_CONFIRMED: "Booking confirmed",
  BOOKING_FAILED: "Booking failed",
  SELECT_ORIGIN_AND_DESTINATION: "Select origin and destination first",
  SELECT_DATE_FIELD: "Select From or To date field",
};

// Error Messages
export const ERROR_MESSAGES = {
  ORIGIN_REQUIRED: "Origin city is required",
  DESTINATION_REQUIRED: "Destination city is required",
  FROM_DATE_REQUIRED: "Departure date is required",
  TO_DATE_REQUIRED: "Return date is required",
  GENERIC_ERROR: "Something went wrong",
};

// TestIds
export const TEST_IDS = {
  FLIGHT_DATE_CALENDAR_WRAPPER: "flight-date-calendar-wrapper",
  FLIGHT_DATE_CALENDAR: "flight-date-calendar",
};

// Enums
export enum FormFields {
  Origin = "origin",
  Destination = "destination",
  FlightTypeOption = "flightTypeOption",
  FromDate = "fromDate",
  ToDate = "toDate",
}

export enum FormFieldLabel {
  Origin = "Origin",
  Destination = "Destination",
  From = "From",
  To = "To",
}

export const DATE_FIELDS_CONFIG: DateFieldConfigType[] = [
  {
    name: FormFields.FromDate,
    label: FormFieldLabel.From,
  },
  {
    name: FormFields.ToDate,
    label: FormFieldLabel.To,
  },
];

export const DEFAULT_BOOKING_FORM_VALUES: Partial<BookingFormValuesType> = {
  origin: "",
  destination: "",
  fromDate: undefined,
  toDate: undefined,
  flightTypeOption: FLIGHT_OPTIONS[0],
};
