import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useWatch, Control } from "react-hook-form";

import { FormFields, type BookingFormValuesType } from "@/components/home/AirlineForm/lib";
import { dateToLocalISOString, isValidDate } from "@/lib/utils/dates";

/**
 * Syncs form values to the URL query string whenever they change
 * Avoids pushing duplicate URLs
 */
export const useSyncFormQuery = (control: Control<BookingFormValuesType>): void => {
  const router = useRouter();
  const lastUrl = useRef("");

  const [origin, destination, fromDate, toDate, flightTypeOption] = useWatch({
    control,
    name: [FormFields.Origin, FormFields.Destination, FormFields.FromDate, FormFields.ToDate, FormFields.FlightTypeOption],
  });

  useEffect(() => {
    const queryFields = { origin, destination, fromDate, toDate };

    const hasValidQuery = isFormValid(queryFields);

    if (!hasValidQuery) {
      return;
    }

    const params = buildFlightSearchParams(queryFields);

    if (flightTypeOption) {
      params.set("type", flightTypeOption);
    }

    const newUrl = `?${params.toString()}`;
    if (newUrl !== lastUrl.current) {
      lastUrl.current = newUrl;
      router.push(newUrl, { scroll: false });
    }
  }, [origin, destination, fromDate, toDate, flightTypeOption, router]);
};

export const isFormValid = ({
  origin,
  destination,
  fromDate,
  toDate,
}: Partial<BookingFormValuesType>): boolean => {
  const hasRequiredLocations = Boolean(origin) && Boolean(destination);
  const hasValidDates = isValidDate(fromDate) && isValidDate(toDate);

  return hasRequiredLocations && hasValidDates;
};

export const buildFlightSearchParams = (
  values: Omit<BookingFormValuesType, "flightTypeOption">
): URLSearchParams => {
  const { origin, destination, fromDate, toDate } = values;

  const params = new URLSearchParams();

  params.set("origin", origin);
  params.set("destination", destination);
  params.set("departureDate", dateToLocalISOString(fromDate));
  params.set("returnDate", dateToLocalISOString(toDate));

  return params;
};
