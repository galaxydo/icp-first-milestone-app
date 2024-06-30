import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * This function conditionally merges class values (strings, nested arrays, objects etc.) using clsx,
 * then applies twMerge to resolve potential conflicts.
 * 
 * @param {ClassValue[]} inputs - An array of class values to be merged.
 * @returns {string} - The merged class string.
 */
export function cn(...inputs: ClassValue[]): string {
    // Conditionally merging class values using clsx and resolving conflicts using twMerge
    return twMerge(clsx(inputs));
}
