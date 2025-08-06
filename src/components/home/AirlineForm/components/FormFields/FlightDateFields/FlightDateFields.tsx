"use client";

import type { Control } from "react-hook-form";

import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  DATE_FIELDS_CONFIG,
  type BookingFormValuesType,
} from "@/components/home/AirlineForm/lib";

import { Select } from "./Select";

interface Props {
  control: Control<BookingFormValuesType>;
}

export const FlightDateFields = ({ control }: Props): JSX.Element => (
  <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-12">
    {DATE_FIELDS_CONFIG.map(({ name, label }) => (
      <FormField
        key={name}
        render={({ field: { value }, fieldState }) => (
          <FormItem>
            <FormControl>
              <Select
                hasError={!!fieldState.error}
                {...{ name, value, label, control }}
              />
            </FormControl>
            {/*To avoid layout jumping */}
            <div className="min-h-[1.25rem]">
              <FormMessage />
            </div>
          </FormItem>
        )}
        {...{ name }}
      />
    ))}
  </div>
);
