import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Spinner from "@/components/ui/Spinner";

describe("Spinner", () => {
	it("has role=status", () => {
		render(<Spinner />);
		expect(screen.getByRole("status")).toBeInTheDocument();
	});

	it("has aria-label of Loading", () => {
		render(<Spinner />);
		expect(screen.getByRole("status")).toHaveAttribute("aria-label", "Loading");
	});

	it("applies additional className", () => {
		render(<Spinner className="text-primary" />);
		expect(screen.getByRole("status")).toHaveClass("text-primary");
	});
});
