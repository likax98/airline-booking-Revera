"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils/classnames";
import type { FlightDestination } from "@/types";
import { Form as FormProvider } from "@/components/ui/form";
import { Bounded } from "@/components/shared";

import {
  ActionButtons,
  FlightDateCalendar,
  FlightTypeField,
  RouteFields,
  FlightDateFields,
} from "./components";
import {
  type BookingFormSchemaType,
  type BookingFormValuesType,
  createBookingFormSchema,
} from "./lib";
import {
  useFormToQuerySync,
  useFlightDateSync,
  useQueryToFormInit,
} from "./hooks";
import { FlightDateFieldProvider } from "./context";
import { getDefaultValuesFromSearchParams } from "./lib/helpers";
import { submitBooking } from "./lib/api";

interface Props {
  destinations: FlightDestination[];
}

export const AirlineForm = ({ destinations }: Props): JSX.Element => {
  const searchParams = useSearchParams();
  const cities = destinations.map(({ city }) => city);

  const schema = useMemo(() => createBookingFormSchema(cities), [cities]);

  const defaultValues = useMemo(
    () => getDefaultValuesFromSearchParams(searchParams),
    [searchParams]
  );

  const form = useForm<BookingFormSchemaType>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const {
    control,
    setValue,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = form;

  useQueryToFormInit(reset);
  useFlightDateSync({ control, setValue });
  useFormToQuerySync(control);

  const onSubmit = (data: BookingFormValuesType): void => {
    void submitBooking(data);
  };

  const calendarProps = { destinations, control, setValue };

  return (
    <FlightDateFieldProvider>
      <div className="flex min-h-screen flex-col items-center justify-center p-4 lg:flex-row">
        <div
          className={cn(
            "flex gap-20 px-6 sm:p-10 lg:p-12 xl:p-20",
            "border border-gray-200 rounded-2xl bg-white shadow-lg"
          )}>
          <FormProvider {...form}>
            <form
              className="relative flex flex-col gap-y-12"
              onSubmit={handleSubmit(onSubmit)}>
              <Bounded>
                <div className="flex flex-col gap-y-10">
                  <RouteFields {...{ control, cities }} />
                  <FlightDateFields {...{ control }} />
                  <div className="block w-auto max-w-sm mx-auto lg:hidden">
                    <FlightDateCalendar {...calendarProps} />
                  </div>
                </div>
                <FlightTypeField {...{ control }} />
                <ActionButtons {...{ isSubmitting }} />
              </Bounded>
            </form>
          </FormProvider>
          <FlightDateCalendar className="hidden lg:block" {...calendarProps} />
        </div>
      </div>
    </FlightDateFieldProvider>
  );
};
