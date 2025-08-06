import { render } from "@testing-library/react";

import { CapsuleField } from "./CapsuleField";

const label = "Capsule Field";

describe("CapsuleField", () => {
  it("renders correctly", () => {
    const { getByText } = render(
      <CapsuleField {...{ label }}>Component</CapsuleField>
    );

    const element = getByText(label);

    expect(element).toBeInTheDocument();
  });

  it("renders children inside the wrapper", () => {
    const testId = "child-element";
    const text = "Child Component";

    const { getByTestId } = render(
      <CapsuleField {...{ label }}>
        <div data-testid={testId}>{text}</div>
      </CapsuleField>
    );

    const element = getByTestId(testId);

    expect(element).toHaveTextContent(text);
  });
});
