import { render, fireEvent, within } from "@testing-library/react";

import { mockOptions } from "@/components/home/AirlineForm/__mocks___";
import { formatLabeledText } from "@/lib/utils/strings";

import { MESSAGES } from "../lib/constants";
import { CapsuleSelect, type CapsuleSelectProps } from "./CapsuleSelect";

const label = "Capsule";

const mockOnChange = jest.fn();

const renderComponent = (
  props?: Partial<Pick<CapsuleSelectProps, "options" | "onChange">>
) =>
  render(
    <CapsuleSelect
      onChange={mockOnChange}
      options={mockOptions}
      {...{ label }}
      {...props}
    />
  );

describe("CapsuleSelect", () => {
  it("renders correctly", () => {
    const { getByText } = renderComponent();

    expect(getByText(label)).toBeInTheDocument();
  });

  it("renders placeholder when no value is selected", () => {
    const { getByRole } = renderComponent();

    const select = getByRole("combobox");

    expect(select).toHaveTextContent(formatLabeledText("Select", label));
  });

  it("renders all options in dropdown", () => {
    const { getByRole } = renderComponent();

    const select = getByRole("combobox");

    fireEvent.click(select);

    const dropdown = getByRole("listbox");

    mockOptions.forEach((option) => {
      expect(within(dropdown).getByText(option)).toBeInTheDocument();
    });
  });

  it("calls 'onChange' when option is selected", () => {
    const [, option] = mockOptions;

    const { getByRole, getByText } = renderComponent();

    const select = getByRole("combobox");

    fireEvent.click(select);
    fireEvent.click(getByText(option));

    expect(mockOnChange).toHaveBeenCalledWith(option);
  });

  it(`shows ${MESSAGES.NO_OPTIONS_AVAILABLE} message when there are no options`, () => {
    const { getByRole } = renderComponent({ options: [] });

    const select = getByRole("combobox");

    fireEvent.click(select);

    const dropdown = getByRole("listbox");

    expect(
      within(dropdown).getByText(MESSAGES.NO_OPTIONS_AVAILABLE)
    ).toBeInTheDocument();
  });
});
