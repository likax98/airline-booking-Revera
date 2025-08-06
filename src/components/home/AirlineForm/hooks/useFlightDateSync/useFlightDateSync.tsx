import { useEffect } from "react";
import { useWatch } from "react-hook-form";
import type { Control, UseFormSetValue } from "react-hook-form";

import { type BookingFormValuesType, FormFields } from "../../lib";

interface Props {
  control: Control<BookingFormValuesType>;
  setValue: UseFormSetValue<BookingFormValuesType>;
}

export const useFlightDateSync = ({ control, setValue }: Props): void => {
  const [fromDate, toDate] = useWatch({
    control,
    name: [FormFields.FromDate, FormFields.ToDate],
  });

  useEffect(() => {
    if (!fromDate || !toDate) {
      return;
    }

    const from = new Date(fromDate).getTime();
    const to = new Date(toDate).getTime();

    if (from > to) {
      setValue(FormFields.ToDate, fromDate, { shouldValidate: true });
    }
  }, [fromDate, toDate, setValue]);
};
