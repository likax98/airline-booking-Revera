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
} from "@/components/home/AirlineForm/lib/utils";
import { useFlightDateField } from "@/components/home/AirlineForm/context";

const [fromDateConfig, toDateConfig] = DATE_FIELDS_CONFIG;

// Main logic of the Calendar. It is tested in the Calendar component unit test
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

  const handleDateSelect = (date?: Date): void => {
    setSelectedFlightDate(
      (d) => setValue(fromDateConfig.name, d, { shouldValidate: true }),
      (d) => setValue(toDateConfig.name, d, { shouldValidate: true }),
      date,
      activeDateField
    );
    setActiveDateField(undefined);
  };

  return {
    origin,
    selectedDate,
    destination,
    activeDateField,
    disabledDates,
    setActiveDateField,
    handleDateSelect,
  };
};
