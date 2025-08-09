import type { BookingFormValuesType, DateFieldConfigType } from "./types";

export const FLIGHT_OPTIONS = ["round-trip", "one-way"];

// Labels
export const LABELS = {
  BOOK_FLIGHT: "Book Flight",
  BOOKING_FLIGHT_LOADING: "Booking",
  RESET: "Reset",
};

// Aria Labels
export const ARIA_LABELS = {
  CLOSE_CALENDAR: "Close Calendar",
};

// Messages
export const MESSAGES = {
  BOOKING_CONFIRMED: "Booking confirmed",
  SELECT_ORIGIN_AND_DESTINATION: "Select origin and destination first",
  SELECT_DATE_FIELD: "Select From or To date field",
};

// Error Messages
export const ERROR_MESSAGES = {
  BOOKING_FAILED: "Booking failed",
  ORIGIN_REQUIRED: "Origin city is required",
  DESTINATION_REQUIRED: "Destination city is required",
  INVALID_URL: "URL is invalid!",
  FROM_DATE_REQUIRED: "Departure date is required",
  FROM_DATE_IS_INVALID: "From date is invalid",
  TO_DATE_REQUIRED: "Return date is required",
  TO_DATE_IS_INVALID: "To date is invalid",
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
  Type = "type",
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
  type: FLIGHT_OPTIONS[0],
  fromDate: undefined,
  toDate: undefined,
};
