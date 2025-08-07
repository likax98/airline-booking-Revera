import { render, RenderResult } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useFormContext } from "react-hook-form";
import { useRouter } from "next/navigation";

import { LABELS } from "../../lib";
import { ActionButtons } from "./ActionButtons";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("react-hook-form", () => ({
  useFormContext: jest.fn(),
}));

const mockReset = jest.fn();
const mockReplace = jest.fn();

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

    const submitBtn = getByRole("button", { name: LABELS.BOOK_FLIGHT });
    const resetBtn = getByRole("button", { name: LABELS.RESET });

    expect(submitBtn).toBeInTheDocument();
    expect(resetBtn).toBeInTheDocument();
  });

  it(`calls 'reset' and 'router.replace' when ${LABELS.RESET} clicked`, async () => {
    const user = userEvent.setup();

    const { getByRole } = renderComponent();

    const resetBtn = getByRole("button", { name: LABELS.RESET });

    await user.click(resetBtn);

    expect(mockReset).toHaveBeenCalledTimes(1);
    expect(mockReplace).toHaveBeenCalledWith("/");
  });

  it(`hides ${LABELS.RESET} button when form is invalid`, () => {
    const { getByRole } = renderComponent({ isValid: false });

    const resetBtn = getByRole("button", { name: LABELS.RESET });

    expect(resetBtn).toHaveClass("opacity-0 invisible pointer-events-none");
  });

  it(`disables submit button and shows '${LABELS.BOOKING_FLIGHT}' when submitting`, () => {
    const { getByRole } = renderComponent({ isSubmitting: true });

    const submitBtn = getByRole("button", { name: LABELS.BOOKING_FLIGHT });

    expect(submitBtn).toBeDisabled();
    expect(submitBtn).toHaveTextContent(LABELS.BOOKING_FLIGHT);
  });
});
