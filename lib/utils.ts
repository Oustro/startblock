import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createGradient() {
  const gradients = [
    "linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)",
    "linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)",
    "linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)",
    "linear-gradient(0deg, #08AEEA 0%, #2AF598 100%)",
    "linear-gradient(0deg, #08AEEA 0%, #2AF598 100%)",
  ];

  return gradients[Math.floor(Math.random() * gradients.length)];
}
