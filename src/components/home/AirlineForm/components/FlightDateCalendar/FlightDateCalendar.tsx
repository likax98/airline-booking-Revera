"use client";

import { useMemo } from "react";
import { Control, UseFormSetValue, useWatch } from "react-hook-form";

import { cn } from "@/lib/utils/className";
import type { FlightDestination } from "@/types";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useFlightDateField } from "@/components/home/AirlineForm/context";
import {
  ARIA_LABELS,
  DATE_FIELDS_CONFIG,
  FormFields,
  TEST_IDS,
  type BookingFormValuesType,
} from "@/components/home/AirlineForm/lib";
import {
  setSelectedFlightDate,
  getDisabledFlightDates,
  getCalendarWarningMessage,
} from "@/components/home/AirlineForm/lib/utils";

export interface FlightDateCalendarProps {
  className?: string;
  control: Control<BookingFormValuesType>;
  destinations: FlightDestination[];
  setValue: UseFormSetValue<BookingFormValuesType>;
}

const [fromDateConfig, toDateConfig] = DATE_FIELDS_CONFIG;
const fromFieldName = fromDateConfig.name;
const toFieldName = toDateConfig.name;

export const FlightDateCalendar = ({
  className,
  destinations,
  control,
  setValue,
}: FlightDateCalendarProps) => {
  const { activeDateField, setActiveDateField } = useFlightDateField();

  const [fromDate, toDate, origin, destination] = useWatch({
    control,
    name: [FormFields.FromDate, FormFields.ToDate, FormFields.Origin, FormFields.Destination],
  });

  const isToFieldActive = activeDateField === toDateConfig.label;
  const selectedFlightDate = isToFieldActive ? toDate : fromDate;

  const disabledFlightDates = useMemo(() => {
    // Mainly for mobile devices
    if (!activeDateField) {
      return () => true;
    }

    return getDisabledFlightDates(
      destinations,
      destination,
      isToFieldActive ? fromDate : undefined
    );
  }, [activeDateField, destinations, destination, fromDate, isToFieldActive]);

  const handleSelectDate = (date?: Date): void => {
    setSelectedFlightDate(
      (d) => setValue(fromFieldName, d, { shouldValidate: true }),
      (d) => setValue(toFieldName, d, { shouldValidate: true }),
      date,
      activeDateField
    );
    setActiveDateField(undefined);
  };

  const closeButton = (
    <Button
      className={cn(
        "absolute right-4 top-4 z-10",
        "hidden lg:block",
        "p-0",
        "text-xl text-gray-400",
        "bg-white shadow-none",
        "hover:bg-transparent hover:text-gray-700"
      )}
      type="button"
      aria-label={ARIA_LABELS.CLOSE_CALENDAR}
      onClick={() => setActiveDateField(undefined)}>
      ×
    </Button>
  );

  const warningMessage = (
    <p
      className="mt-6 text-center text-sm text-yellow-500"
      role="alert">
      {getCalendarWarningMessage({ origin, destination, activeDateField })}
    </p>
  );

  return (
    <div
      className={cn(
        "relative flex",
        "transition-opacity duration-500 ease-in-out",
        "lg:opacity-0 lg:invisible lg:pointer-events-none",
        activeDateField && "lg:opacity-100 lg:visible lg:pointer-events-auto",
        className
      )}
      data-testid={TEST_IDS.FLIGHT_DATE_CALENDAR_WRAPPER}>
      <div className="w-full rounded-2xl bg-white p-6 shadow-lg">
        {closeButton}
        {warningMessage}
        <Calendar
          fixedWeeks
          mode="single"
          captionLayout="dropdown"
          data-testid={TEST_IDS.FLIGHT_DATE_CALENDAR}
          selected={selectedFlightDate}
          disabled={disabledFlightDates}
          onSelect={handleSelectDate}
        />
      </div>
    </div>
  );
};
