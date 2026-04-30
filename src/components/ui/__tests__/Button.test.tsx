import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Button from "@/components/ui/Button";

describe("Button", () => {
	it("renders children", () => {
		render(<Button>Click me</Button>);
		expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
	});

	it("has data-slot=button", () => {
		render(<Button>Action</Button>);
		expect(screen.getByRole("button")).toHaveAttribute("data-slot", "button");
	});

	it("calls onClick when clicked", async () => {
		const onClick = vi.fn();
		render(<Button onClick={onClick}>Press</Button>);
		await userEvent.click(screen.getByRole("button"));
		expect(onClick).toHaveBeenCalledOnce();
	});

	it("is disabled when disabled prop is set", () => {
		render(<Button disabled>Disabled</Button>);
		expect(screen.getByRole("button")).toBeDisabled();
	});

	it("does not call onClick when disabled", async () => {
		const onClick = vi.fn();
		render(<Button disabled onClick={onClick}>Disabled</Button>);
		await userEvent.click(screen.getByRole("button"));
		expect(onClick).not.toHaveBeenCalled();
	});

	it("applies additional className", () => {
		render(<Button className="custom-class">Styled</Button>);
		expect(screen.getByRole("button")).toHaveClass("custom-class");
	});

	it.each(["default", "outline", "secondary", "ghost", "destructive", "link"] as const)(
		"accepts variant=%s without error",
		(variant) => {
			render(<Button variant={variant}>v</Button>);
			expect(screen.getByRole("button")).toBeInTheDocument();
		},
	);
});
