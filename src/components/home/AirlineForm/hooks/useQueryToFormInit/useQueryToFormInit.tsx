import { useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { UseFormReset } from "react-hook-form";

import { getQueryParamsObject } from "@/lib/utils/urls";
import { parseDateFromQuery } from "@/lib/utils/dates";
import {
  type BookingFormValuesType,
  DEFAULT_BOOKING_FORM_VALUES,
  FLIGHT_OPTIONS,
} from "@/components/home/AirlineForm/lib";

const queryParamKeys = [
  "origin",
  "destination",
  "type",
  "departureDate",
  "returnDate",
];

// Syncs form state from URL query parameters on load or when URL changes
// Resets form to blank if no valid query is present
export const useQueryToFormInit = (
  reset: UseFormReset<BookingFormValuesType>
): void => {
  const searchParams = useSearchParams();

  const queryParams = useMemo(
    () => getQueryParamsObject(queryParamKeys, searchParams),
    [searchParams]
  );

  useEffect(() => {
    const values = Object.values(queryParams);
    const hasAnyParams = values.some(Boolean);

    if (!hasAnyParams) {
      reset(DEFAULT_BOOKING_FORM_VALUES);

      return;
    }

    const hasAllParams = values.every(Boolean);

    if (hasAllParams) {
      reset({
        origin: queryParams.origin ?? undefined,
        destination: queryParams.destination ?? undefined,
        type: queryParams.type ?? FLIGHT_OPTIONS[0],
        fromDate: parseDateFromQuery(queryParams.departureDate),
        toDate: parseDateFromQuery(queryParams.returnDate),
      });
    }
  }, [queryParams, reset]);
};
