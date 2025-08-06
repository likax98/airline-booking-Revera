"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils/className";
import type { FlightDestination } from "@/types";
import { Form as FormProvider } from "@/components/ui/form";
import { Bounded } from "@/components/shared";

import {
  ActionButtons,
  FlightDateCalendar,
  FlightTypeOptionField,
  RouteFields,
  FlightDateFields,
} from "./components";
import { type BookingFormValuesType, createBookingFormSchema } from "./lib";
import {
  useSyncFormQuery,
  useFlightDateSync,
  useHydrateFormFromUrl,
} from "./hooks";
import { FlightDateFieldProvider } from "./context";
import { getDefaultValuesFromSearchParams } from "./lib/utils";
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

  const form = useForm<BookingFormValuesType>({
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

  useFlightDateSync({
    control,
    setValue,
  });
  useSyncFormQuery(control);
  useHydrateFormFromUrl(reset);

  const onSubmit = (data: BookingFormValuesType): void => {
    void submitBooking(data);
  };

  return (
    <FlightDateFieldProvider>
      <div
        className={cn(
          "flex min-h-screen flex-col items-center justify-center",
          "px-4 py-10",
          "sm:px-6 lg:flex-row"
        )}>
        <div
          className={cn(
            "flex rounded-2xl border border-gray-200 bg-white shadow-lg",
            "px-6",
            "gap-20 sm:p-10 lg:p-12 xl:gap-26 xl:p-20"
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
                    <FlightDateCalendar
                      {...{ control, destinations, setValue }}
                    />
                  </div>
                </div>
                <FlightTypeOptionField {...{ control }} />
                <ActionButtons {...{ isSubmitting }} />
              </Bounded>
            </form>
          </FormProvider>
          <FlightDateCalendar
            className="hidden lg:block"
            {...{ control, destinations, setValue }}
          />
        </div>
      </div>
    </FlightDateFieldProvider>
  );
};
