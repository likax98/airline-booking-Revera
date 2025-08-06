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

const baseClasses =
  "w-full h-12 lg:w-32 px-7 py-4 text-lg font-light rounded-full";

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
        className={cn(baseClasses, "text-white bg-blue-600 hover:bg-blue-700")}
        type="submit"
        disabled={isSubmitting}>
        {isSubmitting ? LABELS.BOOKING_FLIGHT : LABELS.BOOK_FLIGHT}
      </Button>
      <Button
        className={cn(
          baseClasses,
          "text-gray-600 bg-white border-gray-600",
          "shadow-lg",
          "hover:border-gray-700 hover:bg-gray-100",
          "transition-all duration-300",
          !isValid && "opacity-0 invisible pointer-events-none"
        )}
        type="button"
        onClick={handleReset}>
        {LABELS.RESET}
      </Button>
    </div>
  );
};
