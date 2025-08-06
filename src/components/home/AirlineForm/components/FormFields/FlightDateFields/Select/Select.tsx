"use client";

import { cn } from "@/lib/utils/className";
import { formatDate, isValidDate } from "@/lib/utils/dates";
import { formatLabeledText } from "@/lib/utils/strings";
import { Button } from "@/components/ui/button";
import { CapsuleField } from "@/components/shared/CapsuleField";
import {
  getDateAriaLabel,
  getErrorStyles,
} from "@/components/home/AirlineForm/lib/utils";
import { useFlightDateField } from "@/components/home/AirlineForm/context";
import type { DateFieldLabelType } from "@/components/home/AirlineForm/lib";

export interface SelectProps {
  label: DateFieldLabelType;
  value?: Date;
  hasError?: boolean;
}

export const Select = ({
  label,
  value,
  hasError = false,
}: SelectProps): JSX.Element => {
  const { activeDateField, setActiveDateField } = useFlightDateField();

  const isActive = activeDateField === label;
  const date = isValidDate(value) ? value : undefined;

  const toggle = (): void => {
    setActiveDateField((prev) => (prev === label ? undefined : label));
  };

  return (
    <CapsuleField
      className={cn("transition-colors", hasError && "text-red-600")}
      {...{ label }}>
      <Button
        className={cn(
          "w-full lg:w-60 h-full",
          "px-6 py-4",
          "border border-gray-400 rounded-full",
          "text-lg text-center font-light text-gray-500",
          "hover:border-black hover:text-black hover:bg-white",
          isActive ? "bg-blue-50" : "bg-white",
          getErrorStyles(hasError)
        )}
        type="button"
        aria-label={getDateAriaLabel(label, date)}
        onClick={toggle}>
        {date ? formatDate(date) : formatLabeledText("Select", label, "Date")}
      </Button>
    </CapsuleField>
  );
};
