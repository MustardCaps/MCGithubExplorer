import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Badge } from "@/components/ui/Badge";

describe("Badge", () => {
	it("renders children", () => {
		render(<Badge>Popular</Badge>);
		expect(screen.getByText("Popular")).toBeInTheDocument();
	});

	it("renders as a span by default", () => {
		render(<Badge>Label</Badge>);
		expect(screen.getByText("Label").tagName).toBe("SPAN");
	});

	it("renders as a custom element via render prop", () => {
		render(<Badge render={<a href="/foo" />}>Link</Badge>);
		expect(screen.getByRole("link", { name: "Link" })).toBeInTheDocument();
	});

	it("applies additional className", () => {
		render(<Badge className="ml-2">Tag</Badge>);
		expect(screen.getByText("Tag")).toHaveClass("ml-2");
	});

	it.each(["default", "secondary", "destructive", "outline", "ghost", "link"] as const)(
		"accepts variant=%s without error",
		(variant) => {
			render(<Badge variant={variant}>v</Badge>);
			expect(screen.getByText("v")).toBeInTheDocument();
		},
	);
});
