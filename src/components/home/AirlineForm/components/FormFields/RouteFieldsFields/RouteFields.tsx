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
  type RouteFieldLabelType,
  type BookingFormValuesType,
} from "@/components/home/AirlineForm/lib";
import { getRoutesConfig } from "@/components/home/AirlineForm/lib/utils";

interface Props {
  control: Control<BookingFormValuesType>;
  cities: string[];
}

export const RouteFields = ({ control, cities }: Props): JSX.Element => {
  const [origin, destination] = useWatch({
    control,
    name: [FormFields.Origin, FormFields.Destination],
  });

  const config = getRoutesConfig({ cities, origin, destination });

  return (
    <div className="grid w-full grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-12">
      {config.map(({ label, ...selectProps }) => (
        <FormField
          key={label}
          name={label.toLowerCase() as RouteFieldLabelType}
          render={({ field: { value, onChange }, fieldState }) => (
            <FormItem>
              <FormControl>
                <CapsuleSelect
                  hasError={!!fieldState.error}
                  {...{ label, value, onChange }}
                  {...selectProps}
                />
              </FormControl>
              {/*To avoid layout jumping */}
              <div className="min-h-[1.25rem]">
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
