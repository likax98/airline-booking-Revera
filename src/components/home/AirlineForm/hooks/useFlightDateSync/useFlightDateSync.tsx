import { useEffect } from "react";
import { useWatch, type Control, type UseFormSetValue } from "react-hook-form";

import { toTimestamp } from "@/lib/utils/dates";

import { type BookingFormValuesType, FormFields } from "../../lib";

interface Props {
  control: Control<BookingFormValuesType>;
  setValue: UseFormSetValue<BookingFormValuesType>;
}

// Automatically updates the return date to match the departure date if the return date is earlier
export const useFlightDateSync = ({ control, setValue }: Props): void => {
  const [fromDate, toDate] = useWatch({
    control,
    name: [FormFields.FromDate, FormFields.ToDate],
  });

  useEffect(() => {
    if (!fromDate || !toDate) {
      return;
    }

    const from = toTimestamp(fromDate);
    const to = toTimestamp(toDate);

    if (from > to) {
      setValue(FormFields.ToDate, fromDate, { shouldValidate: true });
    }
  }, [fromDate, toDate, setValue]);
};
