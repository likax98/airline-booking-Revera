/**
 * Returns a new array with the specified item excluded
 *
 * If "itemToExclude" is "undefined", the original array is returned unchanged
 *
 * @template T - The type of the items in the array
 * @param {T[]} items - The array of items to filter
 * @param {T} [itemToExclude] - The item to exclude from the array
 *
 * @returns {T[]} A new array without the excluded item
 */
export const excludeItem = <T>(items: T[], itemToExclude?: T): T[] =>
  itemToExclude === undefined
    ? items
    : items.filter((item) => item !== itemToExclude);
