import { getQueryParamsObject } from "./url";

const keys = ["origin", "destination", "type"] as const;

describe("getQueryParamsObject", () => {
  it("returns correct values for existing keys", () => {
    const searchParams = new URLSearchParams("origin=TBS&destination=PAR");

    const result = getQueryParamsObject(keys, searchParams);

    expect(result).toEqual({
      origin: "TBS",
      destination: "PAR",
      type: null
    });
  });

  it("returns null for missing keys", () => {
    const searchParams = new URLSearchParams("origin=TBS");

    const result = getQueryParamsObject(keys, searchParams);

    expect(result).toEqual({
      origin: "TBS",
      destination: null,
      type: null,
    });
  });

  it("returns all values as null if 'searchParams' is null", () => {
    const result = getQueryParamsObject(keys, null);

    expect(result).toEqual({
      origin: null,
      destination: null,
      type: null,
    });
  });

  it("handles empty keys array correctly", () => {
    const keys = [] as const;
    const searchParams = new URLSearchParams("origin=TBS");

    const result = getQueryParamsObject(keys, searchParams);

    expect(result).toEqual({});
  });
});
