import { excludeItem } from "./arrays";

const cities = ["Paris", "London", "Tokyo"];
const [city, ...otherCities] = cities;

describe("excludeItem", () => {
  it("excludes the specified item from the array", () => {
    const result = excludeItem(cities, city);

    expect(result).toEqual(otherCities);
  });

  it("returns the original array if itemToExclude is undefined", () => {
    const result = excludeItem(cities);

    expect(result).toEqual(cities);
  });

  it("works with numbers", () => {
    const result = excludeItem([1, 2, 3, 4], 2);

    expect(result).toEqual([1, 3, 4]);
  });

  it("returns empty array if all items are excluded", () => {
    const str = "AB";
    const result = excludeItem([str], str);

    expect(result).toEqual([]);
  });

  it("does not mutate the original array", () => {
    const original = ["a", "b", "c"];
    const copy = [...original];

    excludeItem(original, original[1]);

    expect(original).toEqual(copy);
  });
});
