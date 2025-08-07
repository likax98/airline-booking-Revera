"use client";

import { Control } from "react-hook-form";

import { FormField, FormItem } from "@/components/ui/form";
import { FormFields, type BookingFormValuesType } from "@/components/home/AirlineForm/lib";

import { Option } from "./Option";

interface Props {
  control: Control<BookingFormValuesType>;
}

/** A radio field for selecting flight type */
export const FlightTypeOptionField = ({ control }: Props): JSX.Element => (
  <div className="flex flex-col mt-16 mb-11 sm:flex-row">
    <FormField
      name={FormFields.FlightTypeOption}
      render={({ field: { value, onChange } }) => (
        <FormItem>
          <Option {...{ value, onChange }} />
        </FormItem>
      )}
      {...{ control }}
    />
  </div>
);
