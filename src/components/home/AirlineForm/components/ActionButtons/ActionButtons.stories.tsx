import { useForm, FormProvider } from "react-hook-form";

import type { BookingFormValuesType } from "@/components/home/AirlineForm/lib";

import { ActionButtons } from "./ActionButtons";

export default {
  title: "Home/AirlineForm/ActionButtons",
  component: ActionButtons,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "ActionButtons component is a styled submit and reset buttons wrapper used to confirm and submit and reset the flight booking form",
      },
    },
  },
};

export const Default = () => {
  const form = useForm<BookingFormValuesType>({
    mode: "onChange",
    defaultValues: {
      origin: "Tbilisi",
      destination: "Batumi",
    },
  });

  return (
    <FormProvider {...form}>
      <ActionButtons />
    </FormProvider>
  );
};
