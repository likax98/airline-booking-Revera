"use client";

import type { Control, UseFormSetValue } from "react-hook-form";

import { cn } from "@/lib/utils/classnames";
import type { FlightDestination } from "@/types";
import { useCalendarLogic } from "@/components/home/AirlineForm/hooks";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  ARIA_LABELS,
  TEST_IDS,
  type BookingFormValuesType,
} from "@/components/home/AirlineForm/lib";
import { getCalendarWarningMessage } from "@/components/home/AirlineForm/lib/helpers";

export interface FlightDateCalendarProps {
  className?: string;
  destinations: FlightDestination[];
  control: Control<BookingFormValuesType>;
  setValue: UseFormSetValue<BookingFormValuesType>;
}

const { FLIGHT_DATE_CALENDAR, FLIGHT_DATE_CALENDAR_WRAPPER } = TEST_IDS;

export const FlightDateCalendar = ({
  className,
  destinations,
  control,
  setValue,
}: FlightDateCalendarProps): JSX.Element => {
  const {
    origin,
    destination,
    selectedDate,
    activeDateField,
    disabledDates,
    setActiveDateField,
    handleDateSelect,
  } = useCalendarLogic({ control, destinations, setValue });

  const isVisible = !!activeDateField;

  const calendarVisibilityClasses = isVisible
    ? "lg:pointer-events-auto lg:opacity-100 lg:visible"
    : "lg:pointer-events-none lg:opacity-0 lg:invisible";

  const closeButton = (
    <Button
      variant="calendarClose"
      aria-label={ARIA_LABELS.CLOSE_CALENDAR}
      onClick={() => setActiveDateField(undefined)}>
      ×
    </Button>
  );

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
      data-testid={FLIGHT_DATE_CALENDAR_WRAPPER}>
      <div className="w-full rounded-2xl bg-white p-6 shadow-lg">
        {closeButton}

        {warningMessage && (
          <p className="mt-6 text-center text-sm text-yellow-500">
            {warningMessage}
          </p>
        )}

        <Calendar
          fixedWeeks
          mode="single"
          captionLayout="dropdown"
          data-testid={FLIGHT_DATE_CALENDAR}
          selected={selectedDate ?? undefined}
          disabled={disabledDates}
          onSelect={handleDateSelect}
        />
      </div>
    </div>
  );
};
