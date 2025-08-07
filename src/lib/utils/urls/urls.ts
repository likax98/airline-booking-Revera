/**
 * Extracts specific query parameters from a URLSearchParams instance and returns them as an object
 * Each key in the returned object corresponds to a key from the provided array,
 * and the value is the result of "searchParams.get(key)" or "null" if not present
 *
 * @template T - A readonly array of string keys to extract from the query params
 * @param keys - The list of query parameter keys to extract
 * @param searchParams - A URLSearchParams object, or null if unavailable
 * 
 * @returns An object where each key from keys maps to its string value or null if not found
 */
export const getQueryParamsObject = <T extends readonly string[]>(
  keys: T,
  searchParams: URLSearchParams | null
): Record<T[number], string | null> =>
  Object.fromEntries(
    keys.map((key) => [key, searchParams?.get(key) ?? null])
  ) as Record<T[number], string | null>;
