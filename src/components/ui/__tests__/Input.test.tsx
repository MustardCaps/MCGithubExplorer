import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Input from "@/components/ui/Input";

describe("Input", () => {
	it("renders an input element", () => {
		render(<Input />);
		expect(screen.getByRole("textbox")).toBeInTheDocument();
	});

	it("has data-slot=input", () => {
		render(<Input />);
		expect(screen.getByRole("textbox")).toHaveAttribute("data-slot", "input");
	});

	it("forwards type prop", () => {
		render(<Input type="email" />);
		expect(screen.getByRole("textbox")).toHaveAttribute("type", "email");
	});

	it("shows placeholder text", () => {
		render(<Input placeholder="Search..." />);
		expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
	});

	it("is disabled when disabled prop is set", () => {
		render(<Input disabled />);
		expect(screen.getByRole("textbox")).toBeDisabled();
	});

	it("calls onChange as user types", async () => {
		const onChange = vi.fn();
		render(<Input onChange={onChange} />);
		await userEvent.type(screen.getByRole("textbox"), "hello");
		expect(onChange).toHaveBeenCalled();
	});

	it("applies additional className", () => {
		render(<Input className="w-64" />);
		expect(screen.getByRole("textbox")).toHaveClass("w-64");
	});
});
