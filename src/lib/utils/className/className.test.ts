import { cn } from "../className";

describe("cn", () => {
  it("merges multiple classes", () => {
    const result = cn("text-center", "text-lg");

    expect(result).toBe("text-center text-lg");
  });

  it("handles conditional classes correctly", () => {
    const isActive = true;
    const result = cn("px-4", isActive && "bg-blue-500");

    expect(result).toBe("px-4 bg-blue-500");
  });

  it("handles falsy values correctly", () => {
    const result = cn("text-sm", false && "hidden", null, undefined, "");

    expect(result).toBe("text-sm");
  });

  it("handles object inputs correctly", () => {
    const result = cn({ "text-red-500": true, "text-green-500": false });

    expect(result).toBe("text-red-500");
  });

  it("handles array inputs correctly", () => {
    const result = cn(["font-bold", "underline"]);

    expect(result).toBe("font-bold underline");
  });
});
