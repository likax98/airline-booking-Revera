import { useMemo } from "react";
import { Control, UseFormSetValue, useWatch } from "react-hook-form";

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

const [fromDateConfig, toDateConfig] = DATE_FIELDS_CONFIG;

// Functionality is tested in the Calendar component unit test
export const useCalendarLogic = ({
  control,
  setValue,
  destinations,
}: {
  control: Control<BookingFormValuesType>;
  destinations: FlightDestination[];
  setValue: UseFormSetValue<BookingFormValuesType>;
}) => {
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

  const isToFieldActive = activeDateField === toDateConfig.label;
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

  const setDateField = (
    fieldName: keyof BookingFormValuesType,
    date: Date
  ): void => {
    setValue(fieldName, date, { shouldValidate: true });
  };

  const handleDateSelect = (date?: Date): void => {
    setSelectedFlightDate(
      (date) => setDateField(fromDateConfig.name, date),
      (date) => setDateField(toDateConfig.name, date),
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
