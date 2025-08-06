import { render } from "@testing-library/react";

import { TEST_IDS } from "../lib/constants";
import { Bounded } from "./Bounded";

describe("Bounded", () => {
  it("renders correctly", () => {
    const { getByTestId } = render(<Bounded>Default</Bounded>);

    const wrapper = getByTestId(TEST_IDS.BOUNDED_WRAPPER);

    expect(wrapper.tagName).toBe("SECTION");
  });

  it("renders as a custom element when 'as' prop is provided", () => {
    const { getByTestId } = render(
      <Bounded as="article">Custom Element</Bounded>
    );

    const wrapper = getByTestId(TEST_IDS.BOUNDED_WRAPPER);

    expect(wrapper.tagName).toBe("ARTICLE");
  });

  it("applies custom 'className' when provided", () => {
    const { getByTestId } = render(
      <Bounded className="bg-blue-500">Custom ClassNames</Bounded>
    );

    const wrapper = getByTestId(TEST_IDS.BOUNDED_WRAPPER);

    expect(wrapper).toHaveClass("bg-blue-500");
  });
});
