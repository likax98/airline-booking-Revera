import { render, screen } from "@testing-library/react";

import { destinations } from "@/data";

import { AirlineForm } from "./AirlineForm";
import { LABELS } from "./lib";

jest.mock("./lib/api");

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: () => new URLSearchParams(""),
}));

jest.mock("./hooks/useSyncFormQuery", () => ({
  useSyncFormQuery: jest.fn(),
}));

jest.mock("./hooks/useFlightDateSync", () => ({
  useFlightDateSync: jest.fn(),
}));

jest.mock("./hooks/useHydrateFormFromUrl", () => ({
  useHydrateFormFromUrl: jest.fn(),
}));

describe("AirlineForm", () => {
  beforeEach(() => {
    // Needed for Shadcn
    global.ResizeObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  });

  it("renders form fields", () => {
    render(<AirlineForm {...{ destinations }} />);

    expect(screen.getByText("From")).toBeInTheDocument();
    expect(screen.getByText("To")).toBeInTheDocument();
    expect(screen.getByText("Origin")).toBeInTheDocument();
    expect(screen.getByText("Destination")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: LABELS.BOOK_FLIGHT })
    ).toBeInTheDocument();
  });

  // We gonna test form submission in Playwright or it will be a hell
});
