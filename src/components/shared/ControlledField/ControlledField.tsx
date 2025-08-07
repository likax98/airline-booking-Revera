import {
  ControllerRenderProps,
  FieldValues,
  Path,
  UseFormReturn,
} from "react-hook-form";

import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

type ControlledFieldProps<
  Values extends FieldValues,
  FieldName extends Path<Values>,
> = {
  name: FieldName;
  control: UseFormReturn<Values>["control"];
  renderErrorMessages?: boolean;
  render: (props: {
    field: ControllerRenderProps<Values, FieldName>;
    error: boolean;
  }) => JSX.Element;
};

export const ControlledField = <
  Values extends FieldValues,
  FieldName extends Path<Values>,
>({
  name,
  control,
  renderErrorMessages = true,
  render,
}: ControlledFieldProps<Values, FieldName>): JSX.Element => (
  <FormField
    render={({ field, fieldState }) => (
      <FormItem>
        <FormControl>
          {render({ field, error: !!fieldState.error })}
        </FormControl>
  
        {renderErrorMessages && (
          // Prevent layout jumping when error message appears
          <div className="min-h-1 md:min-h-[1.25rem]">
            <FormMessage />
          </div>
        )}
      </FormItem>
    )}
    {...{ name, control }}
  />
);
