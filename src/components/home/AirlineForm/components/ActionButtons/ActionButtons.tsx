"use client";

import { useFormContext } from "react-hook-form";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils/className";
import { Button } from "@/components/ui/button";
import { LABELS } from "@/components/home/AirlineForm/lib";

interface Props {
  className?: string;
  isSubmitting?: boolean;
}

// A styled button group for submitting or resetting the flight booking form
export const ActionButtons = ({ isSubmitting }: Props): JSX.Element => {
  const router = useRouter();
  const { reset, formState } = useFormContext();
  const { isValid } = formState;

  const handleReset = () => {
    router.replace("/");
    reset();
  };

  return (
    <div className="flex flex-col items-center gap-6 sm:gap-8 lg:flex-row">
      <Button
        type="submit"
        variant="submit"
        size="form"
        disabled={isSubmitting}>
        {isSubmitting ? LABELS.BOOKING_FLIGHT : LABELS.BOOK_FLIGHT}
      </Button>
      <Button
        className={cn(!isValid && "opacity-0 invisible pointer-events-none")}
        type="button"
        variant="reset"
        size="form"
        onClick={handleReset}>
        {LABELS.RESET}
      </Button>
    </div>
  );
};
