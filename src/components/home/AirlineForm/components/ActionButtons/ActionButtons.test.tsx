import { render, RenderResult } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/navigation";
import { useFormContext } from "react-hook-form";

import { LABELS } from "../../lib";
import { ActionButtons } from "./ActionButtons";

jest.mock("next/navigation");
jest.mock("react-hook-form");

const mockReset = jest.fn();
const mockReplace = jest.fn();

const { BOOK_FLIGHT, BOOKING_FLIGHT_LOADING, RESET } = LABELS;

const renderComponent = ({
  isValid = true,
  isSubmitting = false,
}: {
  isValid?: boolean;
  isSubmitting?: boolean;
} = {}): RenderResult => {
  (useFormContext as jest.Mock).mockReturnValue({
    reset: mockReset,
    formState: { isValid },
  });

  (useRouter as jest.Mock).mockReturnValue({
    replace: mockReplace,
  });

  return render(<ActionButtons {...{ isSubmitting }} />);
};

describe("ActionButtons", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders both buttons when form is valid", () => {
    const { getByRole } = renderComponent();

    const submitBtn = getByRole("button", { name: BOOK_FLIGHT });
    const resetBtn = getByRole("button", { name: RESET });

    expect(submitBtn).toBeInTheDocument();
    expect(resetBtn).toBeInTheDocument();
  });

  it(`calls 'reset' and 'router.replace' when ${RESET} clicked`, async () => {
    const user = userEvent.setup();

    const { getByRole } = renderComponent();

    const resetBtn = getByRole("button", { name: RESET });

    await user.click(resetBtn);

    expect(mockReset).toHaveBeenCalledTimes(1);
    expect(mockReplace).toHaveBeenCalledWith("/");
  });

  it(`hides ${RESET} button when form is invalid`, () => {
    const { getByRole } = renderComponent({ isValid: false });

    const resetBtn = getByRole("button", { name: RESET });

    expect(resetBtn).toHaveClass("opacity-0 invisible pointer-events-none");
  });

  it(`disables submit button and shows '${BOOKING_FLIGHT_LOADING}' when submitting`, async () => {
    const user = userEvent.setup();

    const { getByRole } = renderComponent({ isSubmitting: true });

    const submitBtn = getByRole("button", { name: BOOKING_FLIGHT_LOADING });

    await user.click(submitBtn);

    expect(submitBtn).toBeDisabled();
    expect(submitBtn).toHaveTextContent(BOOKING_FLIGHT_LOADING);
  });

  it("does not disable submit button when form is invalid", () => {
    const { getByRole } = renderComponent({ isValid: false });

    const submitBtn = getByRole("button", { name: BOOK_FLIGHT });

    expect(submitBtn).not.toBeDisabled();
  });
});
