import { render, RenderResult } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";

import {
  DATE_FIELDS_CONFIG,
  type DateFieldLabelType,
  type BookingFormValuesType,
} from "@/components/home/AirlineForm/lib";
import { getDateAriaLabel } from "@/components/home/AirlineForm/lib/utils";
import {
  FlightDateFieldContext,
  type ContextValue,
} from "@/components/home/AirlineForm/context";
import { mockCities } from "@/components/home/AirlineForm/__mocks___";
import { formatLabeledText } from "@/lib/utils/strings";

import { Select } from "./Select";

const [field] = DATE_FIELDS_CONFIG;
const { label } = field;
const placeholderText = formatLabeledText("Select", label, "Date");

const mockSetActiveDateField = jest.fn();

const FormWrapper = ({
  activeDateField,
  value,
}: {
  activeDateField?: DateFieldLabelType;
  value?: Date;
}): JSX.Element => {
  const { control } = useForm<BookingFormValuesType>({
    defaultValues: {
      origin: mockCities[0],
      destination: mockCities[1],
    },
  });

  const contextValue: ContextValue = {
    activeDateField,
    setActiveDateField: mockSetActiveDateField,
  };

  return (
    <FlightDateFieldContext.Provider value={contextValue}>
      <Select {...{ label, value, control }} />
    </FlightDateFieldContext.Provider>
  );
};

const renderComponent = (props?: {
  activeDateField?: DateFieldLabelType;
  value?: Date;
}): RenderResult => render(<FormWrapper {...props} />);

describe("Flight Date Select", () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
    mockSetActiveDateField.mockClear();
  });

  it("renders label correctly", () => {
    const { getByText } = renderComponent({ value: new Date() });

    expect(getByText(label)).toBeInTheDocument();
  });

  it("renders 'placeholder' when no date is selected", () => {
    const { getByText } = renderComponent({ value: undefined });

    expect(getByText(placeholderText)).toBeInTheDocument();
  });

  it("sets the correct 'aria-label' when a date is selected", () => {
    const date = new Date();

    const { getByRole } = renderComponent({ value: date });

    const button = getByRole("button");

    expect(button).toHaveAttribute("aria-label", getDateAriaLabel(label, date));
  });

  it("applies blue background when field is active", () => {
    const { getByRole } = renderComponent({
      activeDateField: label,
      value: new Date(),
    });

    const button = getByRole("button");

    expect(button).toHaveClass("bg-blue-50");
  });

  it("calls 'setActiveDateField' with label when toggled", async () => {
    const { getByRole } = renderComponent();

    const button = getByRole("button");

    await user.click(button);

    expect(mockSetActiveDateField).toHaveBeenCalledTimes(1);
  });

  it("calls 'setActiveDateField' with undefined when field is already active", async () => {
    const { getByRole } = renderComponent({ activeDateField: label });

    const dateButton = getByRole("button");

    await user.click(dateButton);

    expect(mockSetActiveDateField).toHaveBeenCalledTimes(1);
  });
});
