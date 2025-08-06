/**
 * Replaces all dashes in a string with spaces
 *
 * @param {string} str - The input string containing dashes
 * 
 * @returns {string} The modified string with dashes replaced by spaces
 */
export const replaceDashWithSpace = (str: string): string => str.replace(/-/g, " ");

/**
 * Combines a prefix, label, and optional suffix into a formatted string
 *
 * @param prefix - The text to appear before the label
 * @param label - The main text to display
 * @param suffix - Optional text to appear after the label
 * 
 * @returns The formatted string: "prefix label suffix", or "prefix label" if no suffix is provided
 *
 */
export const formatLabeledText = (prefix: string, label: string, suffix = ""): string =>
  `${prefix} ${label}${suffix ? ` ${suffix}` : ""}`;