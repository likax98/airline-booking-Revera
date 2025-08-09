"use client";

import { useFormContext } from "react-hook-form";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils/classnames";
import { Button } from "@/components/ui/button";
import { LABELS } from "@/components/home/AirlineForm/lib";

interface Props {
  isSubmitting?: boolean;
}

const { BOOK_FLIGHT, BOOKING_FLIGHT_LOADING, RESET } = LABELS;

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
        {isSubmitting ? BOOKING_FLIGHT_LOADING : BOOK_FLIGHT}
      </Button>

      <Button
        className={cn(!isValid && "opacity-0 invisible pointer-events-none")}
        type="button"
        variant="reset"
        size="form"
        onClick={handleReset}>
        {RESET}
      </Button>
    </div>
  );
};
