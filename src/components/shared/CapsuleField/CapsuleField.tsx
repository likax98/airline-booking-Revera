"use client";

import { ReactNode } from "react";

import { cn } from "@/lib/utils/classnames";
import { Label } from "@/components/ui/label";
import { getErrorStyles } from "@/lib/utils/errors";

export interface CapsuleFieldProps {
  id?: string;
  label: string;
  className?: string;
  hasError?: boolean;
  children: ReactNode;
}

/** Floating label wrapper for form controls with consistent error styling */
export const CapsuleField = ({
  id,
  label,
  className,
  hasError = false,
  children,
}: CapsuleFieldProps): JSX.Element => {
  const errorTextClass = getErrorStyles(hasError, ["text"]);

  return (
    <div
      className={cn(
        "relative w-full h-14 min-w-60 group focus-within:text-black",
        errorTextClass,
        className
      )}>
      <Label
        htmlFor={id}
        className={cn(
          "absolute -top-2 left-4 px-1",
          "text-sm font-light text-muted-foreground bg-white",
          "transition-colors duration-300",
          "group-hover:text-current group-focus-within:text-black",
          errorTextClass
        )}>
        {label}
      </Label>
      {children}
    </div>
  );
};
