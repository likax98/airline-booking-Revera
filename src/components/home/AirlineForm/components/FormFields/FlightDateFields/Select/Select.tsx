"use client";

import { cn } from "@/lib/utils/className";
import { formatDate, isValidDate } from "@/lib/utils/dates";
import { formatLabeledText } from "@/lib/utils/strings";
import { getErrorStyles } from "@/lib/utils/errors";
import { Button } from "@/components/ui/button";
import { CapsuleField } from "@/components/shared/CapsuleField";
import { getDateAriaLabel } from "@/components/home/AirlineForm/lib/utils";
import { useFlightDateField } from "@/components/home/AirlineForm/context";
import type { DateFieldLabelType } from "@/components/home/AirlineForm/lib";

export interface SelectProps {
  label: DateFieldLabelType;
  value?: Date;
  hasError?: boolean;
}

// Capsule-style date selector button component for return and departure dates
// Toggles a calendar based on active field state
export const Select = ({
  label,
  value,
  hasError = false,
}: SelectProps): JSX.Element => {
  const { activeDateField, setActiveDateField } = useFlightDateField();

  const isActiveDataField = activeDateField === label;
  const date = isValidDate(value) ? value : undefined;

  const toggle = (): void => {
    setActiveDateField((prev) => (prev === label ? undefined : label));
  };

  return (
    <CapsuleField {...{ label, hasError }}>
      <Button
        className={cn(
          "h-full",
          isActiveDataField && "bg-blue-50",
          getErrorStyles(hasError, ["text", "border", "placeholder"])
        )}
        type="button"
        variant="capsuleDate"
        aria-label={getDateAriaLabel(label, date)}
        onClick={toggle}>
        {date ? formatDate(date) : formatLabeledText("Select", label, "Date")}
      </Button>
    </CapsuleField>
  );
};
