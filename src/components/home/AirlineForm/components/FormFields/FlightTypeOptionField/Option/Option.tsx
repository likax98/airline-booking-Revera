"use client";

import { replaceDashWithSpace } from "@/lib/utils/strings";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  FLIGHT_OPTIONS,
  type FlightOptionType,
} from "@/components/home/AirlineForm/lib";

export interface OptionProps {
  value: FlightOptionType;
  onChange: (e: FlightOptionType) => void;
}

/** A radio button group for flight type selection */
export const Option = ({ value, onChange }: OptionProps): JSX.Element => (
  <RadioGroup className="flex gap-6" onValueChange={onChange} {...{ value }}>
    {FLIGHT_OPTIONS.map((option) => (
      <div className="flex items-center space-x-2" key={option}>
        <RadioGroupItem
          className="w-5 h-5 border-2 border-gray-800 focus:ring-1 focus:ring-blue-500"
          id={option}
          value={option}
        />
        <Label
          className="text-sm text-gray-800 capitalize cursor-pointer"
          htmlFor={option}>
          {replaceDashWithSpace(option)}
        </Label>
      </div>
    ))}
  </RadioGroup>
);
