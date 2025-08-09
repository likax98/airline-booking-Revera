import { useMemo } from "react";
import { UseFormSetValue, useWatch, type Control } from "react-hook-form";

import type { FlightDestination } from "@/types";
import {
  DATE_FIELDS_CONFIG,
  FormFields,
  type BookingFormValuesType,
} from "@/components/home/AirlineForm/lib";
import {
  getDisabledFlightDates,
  setSelectedFlightDate,
} from "@/components/home/AirlineForm/lib/helpers";
import { useFlightDateField } from "@/components/home/AirlineForm/context";

interface Props {
  destinations: FlightDestination[];
  control: Control<BookingFormValuesType>;
  setValue: UseFormSetValue<BookingFormValuesType>;
}

const [FROM_DATE_CONFIG, TO_DATE_CONFIG] = DATE_FIELDS_CONFIG;

// Functionality is tested in the Calendar component unit test
export const useCalendarLogic = ({
  destinations,
  control,
  setValue,
}: Props) => {
  const { activeDateField, setActiveDateField } = useFlightDateField();
  const [fromDate, toDate, origin, destination] = useWatch({
    control,
    name: [
      FormFields.FromDate,
      FormFields.ToDate,
      FormFields.Origin,
      FormFields.Destination,
    ],
  });

  const isToFieldActive = activeDateField === TO_DATE_CONFIG.label;
  const selectedDate = isToFieldActive ? toDate : fromDate;

  const disabledDates = useMemo(() => {
    if (!activeDateField) {
      return () => true;
    }

    return getDisabledFlightDates(
      destinations,
      destination,
      isToFieldActive ? fromDate : undefined
    );
  }, [activeDateField, destinations, destination, fromDate, isToFieldActive]);

  const handleDateSelect = (date?: Date): void => {
    setSelectedFlightDate(
      (date) =>
        setValue(FROM_DATE_CONFIG["name"], date, { shouldValidate: true }),
      (date) =>
        setValue(TO_DATE_CONFIG["name"], date, { shouldValidate: true }),
      date,
      activeDateField
    );
    setActiveDateField(undefined);
  };

  return {
    origin,
    destination,
    selectedDate,
    activeDateField,
    disabledDates,
    setActiveDateField,
    handleDateSelect,
  };
};
