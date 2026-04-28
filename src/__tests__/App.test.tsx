import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import App from "@/App";
import { useGetUser } from "@/hooks/useGetUser";

vi.mock("@/hooks/useGetUser");
vi.mock("@/assets/GitHub_Invertocat_White.svg?react", () => ({
	default: () => <svg aria-label="GitHub logo" />,
}));
vi.mock("@/components/shared/SearchBar", () => ({
	default: () => <div data-testid="search-bar" />,
}));
vi.mock("@/components/shared/GithubUserCard", () => ({
	default: ({ user }: { user: { login: string } }) => (
		<div data-testid="user-card">{user.login}</div>
	),
}));
vi.mock("@/components/shared/GithubRepoCard", () => ({
	default: ({ data }: { data: { name: string } }) => (
		<div data-testid="repo-card">{data.name}</div>
	),
}));

const mockUseGetUser = vi.mocked(useGetUser);
const idle = { data: undefined, isFetching: false } as unknown as ReturnType<typeof useGetUser>;

describe("App", () => {
	beforeEach(() => {
		mockUseGetUser.mockReturnValue(idle);
	});

	it("renders the page heading", () => {
		render(<App />);
		expect(screen.getByRole("heading", { name: "GitHub explorer" })).toBeInTheDocument();
	});

	it("renders the search bar", () => {
		render(<App />);
		expect(screen.getByTestId("search-bar")).toBeInTheDocument();
	});

	it("shows loading text while fetching", () => {
		mockUseGetUser.mockReturnValue({ ...idle, isFetching: true });
		render(<App />);
		expect(screen.getByText("Loading data...")).toBeInTheDocument();
	});

	it("shows user card when user data is available", () => {
		mockUseGetUser.mockReturnValue({
			data: { user: { id: 1, login: "gaearon" }, repos: [] },
			isFetching: false,
		} as unknown as ReturnType<typeof useGetUser>);
		render(<App />);
		expect(screen.getByTestId("user-card")).toBeInTheDocument();
		expect(screen.getByText("gaearon")).toBeInTheDocument();
	});

	it("renders a card for each repo", () => {
		mockUseGetUser.mockReturnValue({
			data: {
				user: { id: 1, login: "gaearon" },
				repos: [
					{ id: 1, name: "react" },
					{ id: 2, name: "redux" },
				],
			},
			isFetching: false,
		} as unknown as ReturnType<typeof useGetUser>);
		render(<App />);
		expect(screen.getAllByTestId("repo-card")).toHaveLength(2);
	});
});
