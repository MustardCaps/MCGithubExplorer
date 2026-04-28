import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

const LANGUAGE_COLORS: Record<string, string> = {
	JavaScript: "#f1e05a",
	TypeScript: "#3178c6",
	Python: "#3572A5",
	Rust: "#dea584",
	Go: "#00ADD8",
	CSS: "#563d7c",
	HTML: "#e34c26",
};

export function getLanguageColor(language: string | null): string {
	return language ? (LANGUAGE_COLORS[language] ?? "#888") : "#888";
}
