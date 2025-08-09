"use client";

import type { Control } from "react-hook-form";

import { ControlledField } from "@/components/shared";
import { Option } from "@/components/home/AirlineForm/components";
import {
  type BookingFormValuesType,
  FormFields,
} from "@/components/home/AirlineForm/lib";

interface Props {
  control: Control<BookingFormValuesType>;
}

export const FlightTypeField = ({ control }: Props): JSX.Element => (
  <div className="flex flex-col mt-16 mb-11 sm:flex-row">
    <ControlledField<BookingFormValuesType, FormFields.Type>
      name={FormFields.Type}
      render={({ field }) => <Option {...field} />}
      {...{ control }}
    />
  </div>
);
