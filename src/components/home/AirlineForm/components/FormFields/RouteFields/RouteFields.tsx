"use client";

import { useWatch, type Control } from "react-hook-form";

import { CapsuleSelect, ControlledField } from "@/components/shared";
import {
  FormFields,
  type BookingFormValuesType,
  type RouteFieldNameType,
} from "@/components/home/AirlineForm/lib";
import { getRoutesConfig } from "@/components/home/AirlineForm/lib/helpers";

interface Props {
  control: Control<BookingFormValuesType>;
  cities: string[];
};

export const RouteFields = ({ control, cities }: Props): JSX.Element => {
  const [origin, destination] = useWatch({
    control,
    name: [FormFields.Origin, FormFields.Destination],
  });

  const config = getRoutesConfig({ cities, origin, destination });

  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-12">
      {config.map(({ label, ...selectProps }) => (
        <ControlledField<BookingFormValuesType, RouteFieldNameType>
          key={label}
          renderErrors
          name={label.toLowerCase() as RouteFieldNameType}
          render={({ field, error }) => (
            <CapsuleSelect
              hasError={error}
              value={field.value}
              onChange={field.onChange}
              {...{ label }}
              {...selectProps}
            />
          )}
          {...{ control }}
        />
      ))}
    </div>
  );
};
