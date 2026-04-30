import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Avatar, AvatarFallback } from "@/components/ui/Avatar";

describe("Avatar", () => {
	it("has data-slot=avatar", () => {
		const { container } = render(<Avatar />);
		expect(container.querySelector("[data-slot='avatar']")).toBeInTheDocument();
	});

	it("sets data-size=sm when size=sm", () => {
		const { container } = render(<Avatar size="sm" />);
		expect(container.querySelector("[data-slot='avatar']")).toHaveAttribute("data-size", "sm");
	});

	it("sets data-size=lg when size=lg", () => {
		const { container } = render(<Avatar size="lg" />);
		expect(container.querySelector("[data-slot='avatar']")).toHaveAttribute("data-size", "lg");
	});

	it("applies additional className", () => {
		const { container } = render(<Avatar className="border-2" />);
		expect(container.querySelector("[data-slot='avatar']")).toHaveClass("border-2");
	});
});

describe("AvatarFallback", () => {
	it("renders fallback text", () => {
		render(
			<Avatar>
				<AvatarFallback>JP</AvatarFallback>
			</Avatar>,
		);
		expect(screen.getByText("JP")).toBeInTheDocument();
	});

	it("has data-slot=avatar-fallback", () => {
		render(
			<Avatar>
				<AvatarFallback>JP</AvatarFallback>
			</Avatar>,
		);
		expect(screen.getByText("JP").closest("[data-slot='avatar-fallback']")).toBeInTheDocument();
	});
});

