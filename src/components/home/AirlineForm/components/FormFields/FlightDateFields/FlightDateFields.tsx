"use client";

import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { DATE_FIELDS_CONFIG } from "@/components/home/AirlineForm/lib";

import { Select } from "./Select";

// A wrapper for the return date and the departure date selection fields in the booking form
export const FlightDateFields = (): JSX.Element => (
  <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-12">
    {DATE_FIELDS_CONFIG.map(({ name, label }) => (
      <FormField
        key={name}
        render={({ field: { value }, fieldState }) => (
          <FormItem>
            <FormControl>
              <Select hasError={!!fieldState.error} {...{ label, value }} />
            </FormControl>
            {/*To avoid layout jumping if form error message shows*/}
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
