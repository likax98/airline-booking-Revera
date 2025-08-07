import { getErrorStyles } from "./errors";

describe("getErrorStyles", () => {
  it("returns empty string if 'hasError' is false", () => {
    expect(getErrorStyles(false)).toBe("");
  });

  it("returns empty string if 'hasError' is undefined", () => {
    expect(getErrorStyles()).toBe("");
  });

  it("returns text and border styles by default when 'hasError' is true", () => {
    const result = getErrorStyles(true);

    expect(result).toBe(
      "text-destructive hover:text-destructive border-destructive hover:border-destructive"
    );
  });

  it("returns only text style when target is ['text']", () => {
    const result = getErrorStyles(true, ["text"]);

    expect(result).toBe("text-destructive hover:text-destructive");
  });

  it("returns only border style when target is ['border']", () => {
    const result = getErrorStyles(true, ["border"]);

    expect(result).toBe("border-destructive hover:border-destructive");
  });

  it("returns only placeholder style when target is ['placeholder']", () => {
    const result = getErrorStyles(true, ["placeholder"]);

    expect(result).toBe("data-[placeholder]:text-destructive data-[placeholder]:hover:text-destructive");
  });

  it("returns all combined styles if all targets are passed", () => {
    const result = getErrorStyles(true, ["text", "border", "placeholder"]);

    expect(result).toBe(
      "text-destructive hover:text-destructive border-destructive hover:border-destructive data-[placeholder]:text-destructive data-[placeholder]:hover:text-destructive"
    );
  });
});
