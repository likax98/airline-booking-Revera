import { DAYS_OF_WEEK_INDEXES } from "@/lib/constants";
import {
  addDays,
  startOfToday,
  isBefore,
  formatDate,
  parseDateFromQuery,
} from "@/lib/utils/dates";
import type { FlightDestination } from "@/types";
import { excludeItem } from "@/lib/utils/arrays";

import {
  DATE_FIELDS_CONFIG,
  DEFAULT_BOOKING_FORM_VALUES,
  FormFieldLabel,
  FormFields,
  MESSAGES,
} from "../constants";
import type {
  BookingFormValuesType,
  DateFieldLabelType,
  RouteFieldConfigType,
} from "../types";

/**
 * Sets the selected date based on the active field label
 *
 * @param setFromDate - Callback to set the 'from' date
 * @param setToDate - Callback to set the 'to' date
 * @param date - The selected date
 * @param activeField - The currently active date field label
 */
export const setSelectedFlightDate = (
  setFromDate: (date: Date) => void,
  setToDate: (date: Date) => void,
  date?: Date,
  activeField?: DateFieldLabelType
): void => {
  if (!date || !activeField) {
    return;
  }

  const [fromDate] = DATE_FIELDS_CONFIG;

  return activeField === fromDate.label ? setFromDate(date) : setToDate(date);
};

/**
 * Returns a function to determine if a given date should be disabled for a destination
 *
 * @param destinations - List of flight destinations with available weekdays
 * @param destination - The selected destination city
 * @param minDate - Optional minimum selectable date (defaults to today)
 *
 * @returns A function that takes a Date and returns true if it's disabled
 */
export const getDisabledFlightDates = (
  destinations: FlightDestination[],
  destination?: string,
  minDate?: Date
): ((date: Date) => boolean) => {
  // If no city is selected, disable all dates
  if (!destination) {
    return () => true;
  }

  const today = startOfToday();
  const matched = destinations.find(({ city }) => city === destination);
  const allowedWeekdays = matched?.availableWeekdays ?? DAYS_OF_WEEK_INDEXES;

  return (date: Date) =>
    isBefore(date, minDate ?? today) ||
    !allowedWeekdays.includes(date.getDay());
};

/**
 * Finds the next available flight date for a given city
 *
 * @param destinations - List of flight destinations
 * @param city - The city to check availability for
 *
 * @returns The next available Date, or undefined if no city is provided
 */
export const getNextFlightDate = (
  destinations: FlightDestination[],
  city?: string
): Date | undefined => {
  if (!city) {
    return;
  }

  const isDisabledDate = getDisabledFlightDates(destinations, city);
  let date = startOfToday();

  while (isDisabledDate(date)) {
    date = addDays(date, 1);
  }

  return date;
};

/**
 * Generates an accessible aria-label for a date selection button
 *
 * @param label - Field label ("From" or "To")
 * @param selectedDate - Optional selected date
 *
 * @returns A descriptive aria-label string for screen readers
 */
export const getDateAriaLabel = (
  label: DateFieldLabelType,
  selectedDate?: Date
): string =>
  selectedDate
    ? `${label} date selected: ${formatDate(selectedDate)}`
    : `Select ${label.toLowerCase()} date`;

/**
 * Returns configuration for flight route select fields based on selected cities
 *
 * @param cities - List of all available city names
 * @param origin - Currently selected origin city (optional)
 * @param destination - Currently selected destination city (optional)
 *
 * @returns Configuration array for origin and destination fields with filtered city options
 */
export const getRoutesConfig = ({
  cities,
  origin,
  destination,
}: {
  cities: string[];
  origin?: string;
  destination?: string;
}): RouteFieldConfigType[] => [
  {
    label: FormFieldLabel.Origin,
    options: excludeItem(cities, destination),
  },
  {
    label: FormFieldLabel.Destination,
    options: origin ? excludeItem(cities, origin) : [],
  },
];

/**
 * Returns conditional CSS for error styling
 *
 * If "hasError" is true, it returns a string of CSS classes that apply red border and text color
 * If "hasError" is false, it returns an empty string
 *
 * @param hasError - A boolean indicating whether the field has a validation error
 *
 * @returns A string of Tailwind classes if there is an error, otherwise an empty string
 *
 * Note: Due to its pure and trivial logic, this function does not require unit tests
 **/
export const getErrorStyles = (hasError: boolean): string =>
  hasError ? "border-red-600 text-red-600 data-[placeholder]:text-red-600" : "";

/**
 * Extracts default form values from a given URLSearchParams object
 *
 * If any query parameter is missing or invalid, it falls back to default values
 *
 * @param params - The URLSearchParams object, typically from "useSearchParams()" or "new URLSearchParams(window.location.search)"
 *
 * @returns A partial object containing form values like origin, destination, flight type, and dates
 *
 **/
export const getDefaultValuesFromSearchParams = (
  params: URLSearchParams | null
): Partial<BookingFormValuesType> => {
  const get = (key: string) => params?.get(key);

  const defaultValues = DEFAULT_BOOKING_FORM_VALUES;

  return {
    origin: get(FormFields.Origin) || defaultValues.origin,
    destination: get(FormFields.Destination) || defaultValues.destination,
    flightTypeOption:
      get(FormFields.FlightTypeOption) || defaultValues.flightTypeOption,
    fromDate:
      parseDateFromQuery(get(FormFields.FromDate)) ?? defaultValues.fromDate,
    toDate: parseDateFromQuery(get(FormFields.ToDate)) ?? defaultValues.toDate,
  };
};

/**
 * Returns a calendar warning message based on form state
 *
 * @param origin - The selected origin city
 * @param destination - The selected destination city
 * @param activeDateField - The currently active date field ("from" or "to"), if any
 *
 * @returns A message string if there's a missing value, otherwise "null"
 *
 **/
export const getCalendarWarningMessage = ({
  origin,
  destination,
  activeDateField,
}: {
  origin: string;
  destination: string;
  activeDateField?: string;
}): string | null => {
  if (!origin || !destination) {
    return MESSAGES.SELECT_ORIGIN_AND_DESTINATION;
  }

  if (!activeDateField) {
    return MESSAGES.SELECT_DATE_FIELD;
  }

  return null;
};
