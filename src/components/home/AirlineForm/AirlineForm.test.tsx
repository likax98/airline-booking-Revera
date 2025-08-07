import { render, RenderResult, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { destinations } from "@/data";

import { AirlineForm } from "./AirlineForm";
import { ERROR_MESSAGES, FormFieldLabel, LABELS } from "./lib";

jest.mock("./lib/api");

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: () => new URLSearchParams(""),
}));

jest.mock("./hooks/useFlightDateSync", () => ({
  useFlightDateSync: jest.fn(),
}));

jest.mock("./hooks/useFormToQuerySync", () => ({
  useFormToQuerySync: jest.fn(),
}));

jest.mock("./hooks/useQueryToFormInit", () => ({
  useQueryToFormInit: jest.fn(),
}));

const requiredMessages = [
  ERROR_MESSAGES.ORIGIN_REQUIRED,
  ERROR_MESSAGES.DESTINATION_REQUIRED,
  ERROR_MESSAGES.FROM_DATE_REQUIRED,
  ERROR_MESSAGES.TO_DATE_REQUIRED,
];

const renderComponent = (): RenderResult =>
  render(<AirlineForm {...{ destinations }} />);

describe("AirlineForm", () => {
  beforeAll(() => {
    // Needed for Shadcn
    global.ResizeObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  });

  it("renders form fields", () => {
    const { getByText, getByRole } = renderComponent();

    const labels = Object.values(FormFieldLabel);

    labels.forEach((label) => {
      expect(getByText(label)).toBeInTheDocument();
    });

    const submitBtn = getByRole("button", { name: LABELS.BOOK_FLIGHT });

    expect(submitBtn).toBeInTheDocument();
  });
});

it("shows validation errors when submitting empty form", async () => {
  const user = userEvent.setup();

  const { getByText, getByRole } = renderComponent();

  await user.click(getByRole("button", { name: LABELS.BOOK_FLIGHT }));

  await waitFor(() => {
    requiredMessages.forEach((message) => {
      expect(getByText(message)).toBeInTheDocument();
    });
  });
});

// The form submission is tested in Playwright, check "AirplaneForm.spec.tsx"
