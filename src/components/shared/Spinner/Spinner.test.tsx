import { render, RenderResult, waitFor } from "@testing-library/react";
import { Suspense, lazy } from "react";

import { Spinner } from "./Spinner";

const LazyFakeComponent = lazy(() =>
  Promise.resolve({
    default: () => <div>Loaded Component</div>,
  })
);

const TestWrapper = () => (
  <Suspense fallback={<Spinner />}>
    <LazyFakeComponent />
  </Suspense>
);

const renderComponent = (): RenderResult => render(<TestWrapper />);

describe("Suspense fallback with Spinner", () => {
  it("renders correctly", async () => {
    const { getByRole } = renderComponent();

    expect(getByRole("status")).toBeInTheDocument();
  });

  it("renders component after loading", async () => {
    const { getByText } = renderComponent();

    await waitFor(() => {
      expect(getByText("Loaded Component")).toBeInTheDocument();
    });
  });
});
