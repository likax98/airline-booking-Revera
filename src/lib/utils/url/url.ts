export const getQueryParamsObject = <T extends readonly string[]>(
  keys: T,
  searchParams: URLSearchParams | null
): Record<T[number], string | null> =>
  Object.fromEntries(
    keys.map((key) => [key, searchParams?.get(key)])
  ) as Record<T[number], string | null>;
