import { act } from "react";
import { renderHook } from "@testing-library/react-hooks";
import { useForm } from "react-hook-form";

import { useFlightDateSync } from "./useFlightDateSync";
import { FormFields, type BookingFormValuesType } from "../../lib";

const dateEarly = new Date("2025-08-01");
const dateLate = new Date("2025-08-05");

describe("useFlightDateSync", () => {
  it(`updates ${FormFields.ToDate} if ${FormFields.FromDate} is later`, () => {
    const { result } = renderHook(() =>
      useForm<BookingFormValuesType>({
        defaultValues: {
          fromDate: dateLate,
          toDate: dateEarly,
        },
      })
    );

    const { control, setValue, getValues } = result.current;

    renderHook(() => useFlightDateSync({ control, setValue }));

    act(() => {
      setValue(FormFields.FromDate, dateLate);
      setValue(FormFields.ToDate, dateEarly);
    });

    expect(getValues(FormFields.ToDate)).toEqual(dateLate);
  });

  it(`does not update ${FormFields.ToDate} if ${FormFields.FromDate} is earlier or equal`, () => {
    const { result } = renderHook(() => 
      useForm<BookingFormValuesType>({
        defaultValues: {
          fromDate: dateEarly,
          toDate: dateLate,
        },
      })
    );

    const { control, setValue, getValues } = result.current;

    renderHook(() => {
      useFlightDateSync({ control, setValue });
    });

    act(() => {
      setValue(FormFields.FromDate, dateEarly);
      setValue(FormFields.ToDate, dateLate);
    });

    expect(getValues(FormFields.ToDate)).toEqual(dateLate);
  });
});
