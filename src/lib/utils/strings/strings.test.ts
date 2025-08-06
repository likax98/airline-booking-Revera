import { formatLabeledText, replaceDashWithSpace } from "../strings";

describe("replaceDashWithSpace", () => {
  it("replaces single dash with space", () => {
    expect(replaceDashWithSpace("happy-flight")).toBe("happy flight");
  });

  it("replaces multiple dashes with spaces", () => {
    expect(replaceDashWithSpace("super-happy-flight")).toBe(
      "super happy flight"
    );
  });

  it("returns the same string if no dashes", () => {
    expect(replaceDashWithSpace("happy flight")).toBe("happy flight");
  });
});

describe("formatLabeledText", () => {
  it("returns combined text without suffix", () => {
    expect(formatLabeledText("Select", "Origin")).toBe("Select Origin");
  });

  it("returns combined text with suffix", () => {
    expect(formatLabeledText("Select", "From", "Date")).toBe(
      "Select From Date"
    );
  });

  it("handles empty prefix", () => {
    expect(formatLabeledText("", "Label")).toBe(" Label");
  });

  it("handles empty label", () => {
    expect(formatLabeledText("Prefix", "")).toBe("Prefix ");
  });

  it("handles empty suffix", () => {
    expect(formatLabeledText("Choose", "Option", "")).toBe("Choose Option");
  });

  it("handles all parts empty", () => {
    expect(formatLabeledText("", "", "")).toBe(" ");
  });
});
