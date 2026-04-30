import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/Card";

describe("Card", () => {
	it("renders children", () => {
		render(<Card>Content</Card>);
		expect(screen.getByText("Content")).toBeInTheDocument();
	});

	it("has data-slot=card", () => {
		render(<Card>x</Card>);
		expect(screen.getByText("x").closest("[data-slot='card']")).toBeInTheDocument();
	});

	it("sets data-size=sm when size=sm", () => {
		render(<Card size="sm">x</Card>);
		expect(screen.getByText("x").closest("[data-slot='card']")).toHaveAttribute("data-size", "sm");
	});

	it("applies additional className", () => {
		render(<Card className="mt-4">x</Card>);
		expect(screen.getByText("x").closest("[data-slot='card']")).toHaveClass("mt-4");
	});
});

describe("CardHeader", () => {
	it("renders children and has correct data-slot", () => {
		render(<Card><CardHeader>Header</CardHeader></Card>);
		expect(screen.getByText("Header").closest("[data-slot='card-header']")).toBeInTheDocument();
	});
});

describe("CardTitle", () => {
	it("renders children and has correct data-slot", () => {
		render(<Card><CardTitle>Title</CardTitle></Card>);
		expect(screen.getByText("Title").closest("[data-slot='card-title']")).toBeInTheDocument();
	});
});

describe("CardDescription", () => {
	it("renders children and has correct data-slot", () => {
		render(<Card><CardDescription>Desc</CardDescription></Card>);
		expect(screen.getByText("Desc").closest("[data-slot='card-description']")).toBeInTheDocument();
	});
});

describe("CardContent", () => {
	it("renders children and has correct data-slot", () => {
		render(<Card><CardContent>Body</CardContent></Card>);
		expect(screen.getByText("Body").closest("[data-slot='card-content']")).toBeInTheDocument();
	});
});

describe("CardFooter", () => {
	it("renders children and has correct data-slot", () => {
		render(<Card><CardFooter>Footer</CardFooter></Card>);
		expect(screen.getByText("Footer").closest("[data-slot='card-footer']")).toBeInTheDocument();
	});
});
