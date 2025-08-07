"use client";

import { useWatch, type Control } from "react-hook-form";

import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { CapsuleSelect } from "@/components/shared";
import {
  FormFields,
  type BookingFormValuesType,
  RouteFieldName,
} from "@/components/home/AirlineForm/lib";
import { getRoutesConfig } from "@/components/home/AirlineForm/lib/helpers";

// A origin and destination fields wrapper in the flight booking form
export const RouteFields = ({
  control,
  cities,
}: {
  control: Control<BookingFormValuesType>;
  cities: string[];
}): JSX.Element => {
  const [origin, destination] = useWatch({
    control,
    name: [FormFields.Origin, FormFields.Destination],
  });

  const config = getRoutesConfig({ cities, origin, destination });

  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-12">
      {config.map(({ label, ...selectProps }) => (
        <FormField
          key={label}
          name={label.toLowerCase() as RouteFieldName}
          render={({ field: { value, onChange }, fieldState }) => (
            <FormItem>
              <FormControl>
                <CapsuleSelect
                  hasError={!!fieldState.error}
                  {...{ label, value, onChange }}
                  {...selectProps}
                />
              </FormControl>
              <div className="min-h-1 md:min-h-[1.25rem]">
                <FormMessage />
              </div>
            </FormItem>
          )}
          {...{ control }}
        />
      ))}
    </div>
  );
};
