/**
 * Returns conditional error styles using theme tokens (e.g., "text-destructive", "border-destructive")
 * Useful for applying accessible and consistent error styling across form elements
 *
 * @param hasError - Whether the field is in an error state
 * @param targets - An array of target style types. Defaults to ["text", "border"]
 *
 * @returns A string of class names representing error styles
 *
 **/
type ErrorStyleTarget = "text" | "border" | "placeholder";

export const getErrorStyles = (
  hasError?: boolean,
  targets: ErrorStyleTarget[] = ["text", "border"]
): string => {
  if (!hasError) {
    return "";
  }

  const styles = {
    text: "text-destructive hover:text-destructive",
    border: "border-destructive hover:border-destructive",
    // For Select
    placeholder:
      "data-[placeholder]:text-destructive data-[placeholder]:hover:text-destructive",
  };

  return targets.map((key) => styles[key]).join(" ");
};
