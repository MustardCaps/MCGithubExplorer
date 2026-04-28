import { describe, expect, it } from "vitest";
import { cn } from "@/lib/utils";

describe("cn", () => {
	it("merges class names", () => {
		expect(cn("foo", "bar")).toBe("foo bar");
	});

	it("ignores falsy values", () => {
		expect(cn("foo", undefined, null, false, "bar")).toBe("foo bar");
	});

	it("resolves tailwind conflicts by keeping the last value", () => {
		expect(cn("p-2", "p-4")).toBe("p-4");
		expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
	});

	it("handles conditional classes", () => {
		const active = true;
		const disabled = false;
		expect(cn("base", active && "active", disabled && "disabled")).toBe(
			"base active",
		);
	});
});
