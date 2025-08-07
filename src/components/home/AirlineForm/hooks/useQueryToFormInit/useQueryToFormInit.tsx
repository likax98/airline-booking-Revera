import { useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { UseFormReset } from "react-hook-form";

import { getQueryParamsObject } from "@/lib/utils/url";
import { parseDateFromQuery } from "@/lib/utils/dates";
import {
  type BookingFormValuesType,
  DEFAULT_BOOKING_FORM_VALUES,
  FLIGHT_OPTIONS,
} from "@/components/home/AirlineForm/lib";

const queryParamKeys = [
  "origin",
  "destination",
  "departureDate",
  "returnDate",
  "type",
];

// Syncs form state from URL query parameters on load or when URL changes.
// Resets form to blank if no valid query is present
export const useQueryToFormInit = (
  reset: UseFormReset<BookingFormValuesType>
): void => {
  const searchParams = useSearchParams();

  const queryParams = useMemo(
    () => getQueryParamsObject(queryParamKeys, searchParams),
    [searchParams]
  );

  const hasAnyQueryParams = useMemo(
    () => Object.values(queryParams).some(Boolean),
    [queryParams]
  );

  useEffect(() => {
    const { origin, destination, departureDate, returnDate, type } =
      queryParams;

    if (!hasAnyQueryParams) {
      reset(DEFAULT_BOOKING_FORM_VALUES);

      return;
    }

    if (origin && destination && departureDate && returnDate) {
      reset({
        origin,
        destination,
        flightTypeOption: type ?? FLIGHT_OPTIONS[0],
        fromDate: parseDateFromQuery(departureDate),
        toDate: parseDateFromQuery(returnDate),
      });
    }
  }, [hasAnyQueryParams, queryParams, reset]);
};
