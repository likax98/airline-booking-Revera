"use client";

import { cn } from "@/lib/utils/classnames";
import { formatDate, isValidDate } from "@/lib/utils/dates";
import { formatLabeledText } from "@/lib/utils/strings";
import { getErrorClasses } from "@/lib/utils/errors";
import { Button } from "@/components/ui/button";
import { CapsuleField } from "@/components/shared/CapsuleField";
import { getDateAriaLabel } from "@/components/home/AirlineForm/lib/helpers";
import { useFlightDateField } from "@/components/home/AirlineForm/context";
import type { DateFieldLabelType } from "@/components/home/AirlineForm/lib";

export interface DateSelectButtonProps {
  label: DateFieldLabelType;
  value?: Date;
  hasError?: boolean;
}

export const DateSelectButton = ({
  label,
  value,
  hasError = false,
}: DateSelectButtonProps): JSX.Element => {
  const { activeDateField, setActiveDateField } = useFlightDateField();

  const date = isValidDate(value) ? value : undefined;
  const placeholder = formatLabeledText("Select", label, "Date");
  const isActiveDataField = activeDateField === label;
  const errorStyles = getErrorClasses(hasError, [
    "text",
    "border",
    "placeholder",
  ]);

  const toggle = (): void => {
    setActiveDateField((prev) => (prev === label ? undefined : label));
  };

  return (
    <CapsuleField {...{ label, hasError }}>
      <Button
        className={cn("h-full", isActiveDataField && "bg-blue-50", errorStyles)}
        type="button"
        variant="capsuleDate"
        aria-label={getDateAriaLabel(label, date)}
        onClick={toggle}>
        {date ? formatDate(date) : placeholder}
      </Button>
    </CapsuleField>
  );
};
