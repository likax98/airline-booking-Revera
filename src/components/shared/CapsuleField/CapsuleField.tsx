"use client";

import { ReactNode } from "react";

import { cn } from "@/lib/utils/classnames";
import { Label } from "@/components/ui/label";
import { getErrorClasses } from "@/lib/utils/errors";

export interface CapsuleFieldProps {
  className?: string;
  id?: string;
  label: string;
  hasError?: boolean;
  children: ReactNode;
}

export const CapsuleField = ({
  className,
  id,
  label,
  hasError = false,
  children,
}: CapsuleFieldProps): JSX.Element => {
  const errorClasses = getErrorClasses(hasError, ["text"]);

  return (
    <div
      className={cn(
        "relative w-full h-14 min-w-60 group focus-within:text-black",
        className,
        errorClasses
      )}>
      <Label
        className={cn(
          "absolute -top-2 left-4 px-1",
          "text-sm font-light text-muted-foreground bg-white",
          "transition-colors duration-300",
          "group-hover:text-current group-focus-within:text-black",
          errorClasses
        )}
        htmlFor={id}>
        {label}
      </Label>
      {children}
    </div>
  );
};
