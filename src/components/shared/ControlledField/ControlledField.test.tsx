import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FormProvider, useForm } from "react-hook-form";

import { ControlledField } from "./ControlledField";

// Test form values
type FormValues = {
  testInput: string;
};

const label = "Test Label";
const text = "Test Text";
const id = "test-input";

const TestComponent = ({
  defaultValues,
}: {
  defaultValues?: Partial<FormValues>;
}) => {
  const form = useForm<FormValues>({
    defaultValues: defaultValues || { testInput: "" },
    mode: "onSubmit",
  });

  return (
    <FormProvider {...form}>
      <form>
        <ControlledField<FormValues, "testInput">
          name="testInput"
          control={form.control}
          render={({ field }) => (
            <>
              <label htmlFor={id}>{label}</label>
              <input {...field} {...{ id }} />
            </>
          )}
        />
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  );
};

describe("ControlledField", () => {
  it("renders the input with default value", () => {
    const { getByLabelText } = render(
      <TestComponent defaultValues={{ testInput: text }} />
    );

    const input = getByLabelText(label) as HTMLInputElement;

    expect(input.value).toBe(text);
  });

  it("allows typing into the input", async () => {
    const { getByLabelText } = render(<TestComponent />);

    const input = getByLabelText(label);

    await userEvent.type(input, text);

    expect(getByLabelText(label)).toHaveValue(text);
  });
});
