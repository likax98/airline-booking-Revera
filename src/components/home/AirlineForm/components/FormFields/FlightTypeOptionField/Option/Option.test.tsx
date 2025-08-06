import { render, RenderResult } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { replaceDashWithSpace } from "@/lib/utils/strings";
import { FLIGHT_OPTIONS } from "@/components/home/AirlineForm/lib";

import { Option, type OptionProps } from "./Option";

const [roundTrip, oneWay] = FLIGHT_OPTIONS;
const mockOnChange = jest.fn();

const defaultProps = {
  value: roundTrip,
  onChange: mockOnChange,
};

const formattedOneWay = replaceDashWithSpace(oneWay);

const renderComponent = (props?: Partial<OptionProps>): RenderResult =>
  render(<Option {...defaultProps} {...props} />);

describe("Flight Type Option", () => {
  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it("renders the correct number of options", () => {
    const { getAllByRole } = renderComponent();

    expect(getAllByRole("radio")).toHaveLength(FLIGHT_OPTIONS.length);
  });

  it("renders flight options correctly", () => {
    const { getByText } = renderComponent();

    FLIGHT_OPTIONS.forEach((type) => {
      const optionText = replaceDashWithSpace(type);

      expect(getByText(optionText)).toBeInTheDocument();
    });
  });

  it("shows the correct radio value by default", () => {
    const { getByRole } = renderComponent({ value: oneWay });

    const radio = getByRole("radio", { name: formattedOneWay });

    expect(radio).toBeChecked();
  });

  it("calls 'onChange' when a new option is selected", async () => {
    const user = userEvent.setup();

    const { getByRole } = renderComponent({ value: roundTrip });

    const radio = getByRole("radio", { name: formattedOneWay });

    await user.click(radio);

    expect(mockOnChange).toHaveBeenCalledWith(oneWay);
  });
});
