import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createGradient() {
  const gradients = [
    "from-yellow-400 via-red-500 to-pink-500",
    "from-green-400 via-blue-500 to-indigo-500",
    "from-purple-400 via-pink-500 to-red-500",
    "from-yellow-400 via-green-500 to-blue-500",
    "from-blue-400 via-indigo-500 to-purple-500",
    "from-red-400 via-yellow-500 to-green-500",
    "from-pink-400 via-purple-500 to-indigo-500",
    "from-green-400 via-yellow-500 to-red-500",
    "from-blue-400 via-green-500 to-blue-500",
    "from-indigo-400 via-purple-500 to-pink-500",
    "from-red-400 via-pink-500 to-purple-500",
    "from-yellow-400 via-green-500 to-blue-500",
  ];

  return gradients[Math.floor(Math.random() * gradients.length)];
}
