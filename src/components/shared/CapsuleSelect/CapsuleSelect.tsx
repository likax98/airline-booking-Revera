"use client";

import { cn } from "@/lib/utils/className";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getErrorStyles } from "@/components/home/AirlineForm/lib/utils";
import { formatLabeledText } from "@/lib/utils/strings";

import { CapsuleField } from "../CapsuleField";
import { MESSAGES } from "../lib/constants";

export interface CapsuleSelectProps {
  label: string;
  options: string[];
  hasError?: boolean;
  value?: string;
  onChange: (value: string) => void;
}

// Shadcn Select delays rendering for some time
export const CapsuleSelect = ({
  label,
  options = [],
  value = "",
  hasError = false,
  onChange,
}: CapsuleSelectProps): JSX.Element => (
  <CapsuleField
    className={cn("transition-colors", hasError && "text-red-600")}
    {...{ label }}>
    <Select onValueChange={onChange} {...{ value }}>
      <SelectTrigger
        className={cn(
          "w-full h-full lg:w-60",
          "flex items-center justify-center",
          "px-6 py-4",
          "border border-gray-400 rounded-full",
          "text-lg font-light text-center text-gray-500",
          "appearance-none outline-none [&>svg]:hidden",
          "transition-colors duration-300",
          "hover:text-black hover:border-black",
          "focus:text-black focus:border-black",
          getErrorStyles(hasError)
        )}>
        <SelectValue placeholder={formatLabeledText("Select", label)} />
      </SelectTrigger>
      <SelectContent>
        {options.length ? (
          options.map((option) => (
            <SelectItem
              className="flex justify-center cursor-pointer"
              key={option}
              value={option}>
              {option}
            </SelectItem>
          ))
        ) : (
          <div className="py-2 text-center text-sm text-gray-400 select-none">
            {MESSAGES.NO_OPTIONS_AVAILABLE}
          </div>
        )}
      </SelectContent>
    </Select>
  </CapsuleField>
);
