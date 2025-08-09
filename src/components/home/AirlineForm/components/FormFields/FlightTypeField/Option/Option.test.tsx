import { render, RenderResult } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { replaceDashWithSpace } from "@/lib/utils/strings";
import { FLIGHT_OPTIONS } from "@/components/home/AirlineForm/lib";

import { Option, type OptionProps } from "./Option";

const [ROUND_TRIP, ONE_WAY] = FLIGHT_OPTIONS;

const mockOnChange = jest.fn();

const defaultProps: OptionProps = {
  value: ROUND_TRIP,
  onChange: mockOnChange,
};

const renderComponent = (props?: Partial<OptionProps>): RenderResult =>
  render(<Option {...defaultProps} {...props} />);

const getRadios = (getByRole: RenderResult["getByRole"]) =>
  FLIGHT_OPTIONS.map((option) =>
    getByRole("radio", { name: replaceDashWithSpace(option) })
  );

const getRadioByLabel = (getByRole: RenderResult["getByRole"], label: string) =>
  getByRole("radio", { name: replaceDashWithSpace(label) });

describe("FlightTypeOptionField > Option", () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeAll(() => {
    user = userEvent.setup();
  });

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it("renders one radio per flight type", () => {
    const { getByRole } = renderComponent();

    const radios = getRadios(getByRole);

    expect(radios).toHaveLength(FLIGHT_OPTIONS.length);
  });

  it("renders correct text labels", () => {
    const { getByText } = renderComponent();

    FLIGHT_OPTIONS.forEach((option) => {
      expect(getByText(replaceDashWithSpace(option))).toBeInTheDocument();
    });
  });

  it("marks only the selected radio as checked", async () => {
    const { getByRole } = renderComponent({ value: ONE_WAY });

    const oneWayRadio = getRadioByLabel(getByRole, ONE_WAY);
    const roundTripRadio = getRadioByLabel(getByRole, ROUND_TRIP);

    expect(oneWayRadio).toBeChecked();
    expect(roundTripRadio).not.toBeChecked();
  });

  it("shows the correct default checked value", () => {
    const { getByRole } = renderComponent({ value: ONE_WAY });

    const radio = getRadioByLabel(getByRole, ONE_WAY);
  
    expect(radio).toBeChecked();
  });

  it("calls onChange when selecting a different option", async () => {
    const { getByRole } = renderComponent({ value: ROUND_TRIP });

    const targetRadio = getRadioByLabel(getByRole, ONE_WAY);

    await user.click(targetRadio);

    expect(mockOnChange).toHaveBeenCalledWith(ONE_WAY);
  });
});
