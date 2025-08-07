"use client";

import { Control, UseFormSetValue } from "react-hook-form";

import { cn } from "@/lib/utils/classnames";
import type { FlightDestination } from "@/types";
import { useCalendarLogic } from "@/components/home/AirlineForm/hooks";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  ARIA_LABELS,
  BookingFormValuesType,
  TEST_IDS,
} from "@/components/home/AirlineForm/lib";
import { getCalendarWarningMessage } from "@/components/home/AirlineForm/lib/helpers";

export interface FlightDateCalendarProps {
  className?: string;
  control: Control<BookingFormValuesType>;
  destinations: FlightDestination[];
  setValue: UseFormSetValue<BookingFormValuesType>;
}

export const FlightDateCalendar = ({
  className,
  destinations,
  control,
  setValue,
}: FlightDateCalendarProps) => {
  const {
    selectedDate,
    disabledDates,
    activeDateField,
    setActiveDateField,
    origin,
    destination,
    handleDateSelect,
  } = useCalendarLogic({ control, destinations, setValue });

  const isVisible = !!activeDateField;

  const calendarVisibilityClasses = isVisible
    ? "lg:pointer-events-auto lg:opacity-100 lg:visible"
    : "lg:pointer-events-none lg:opacity-0 lg:invisible";

  const warningMessage = getCalendarWarningMessage({
    origin,
    destination,
    activeDateField,
  });

  return (
    <div
      className={cn(
        "relative flex transition-opacity duration-500 ease-in-out",
        calendarVisibilityClasses,
        className
      )}
      data-testid={TEST_IDS.FLIGHT_DATE_CALENDAR_WRAPPER}>
      <div className="w-full rounded-2xl bg-white p-6 shadow-lg">
        <Button
          variant="calendarClose"
          aria-label={ARIA_LABELS.CLOSE_CALENDAR}
          onClick={() => setActiveDateField(undefined)}>
          ×
        </Button>

        {warningMessage && (
          <p className="mt-6 text-center text-sm text-yellow-500" role="alert">
            {warningMessage}
          </p>
        )}

        <Calendar
          fixedWeeks
          mode="single"
          captionLayout="dropdown"
          data-testid={TEST_IDS.FLIGHT_DATE_CALENDAR}
          selected={selectedDate ?? undefined}
          disabled={disabledDates}
          onSelect={handleDateSelect}
        />
      </div>
    </div>
  );
};
