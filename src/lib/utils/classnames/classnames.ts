import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names using "clsx" and resolves Tailwind classes conflicts using "tailwind-merge"
 *
 * @param {...ClassValue[]} inputs - One or more class values (strings, arrays, objects)
 * 
 * @returns {string} - A merged class name string with Tailwind conflict resolution
 */
export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));
