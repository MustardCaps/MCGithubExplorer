import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import GithubRepoCard from "@/components/shared/GithubRepoCard";
import type { TGithubRepo } from "@/types/github";

const baseRepo: TGithubRepo = {
	id: 1,
	name: "react",
	full_name: "gaearon/react",
	description: "A JavaScript library for building user interfaces",
	html_url: "https://github.com/gaearon/react",
	homepage: null,
	language: "JavaScript",
	fork: false,
	forks_count: 100,
	stargazers_count: 1000,
	watchers_count: 1000,
	open_issues_count: 50,
	topics: [],
	archived: false,
	visibility: "public",
	default_branch: "main",
	created_at: "2020-01-01T00:00:00Z",
	updated_at: "2024-01-01T00:00:00Z",
	license: null,
};

describe("GithubRepoCard", () => {
	it("has correct aria-label on the article", () => {
		render(<GithubRepoCard data={baseRepo} />);
		expect(
			screen.getByRole("article", { name: "react repository" }),
		).toBeInTheDocument();
	});

	it("renders the repo name as a link", () => {
		render(<GithubRepoCard data={baseRepo} />);
		const link = screen.getByRole("link", { name: /react/ });
		expect(link).toHaveAttribute("href", "https://github.com/gaearon/react");
		expect(link).toHaveAttribute("target", "_blank");
	});

	it("shows description when present", () => {
		render(<GithubRepoCard data={baseRepo} />);
		expect(
			screen.getByText("A JavaScript library for building user interfaces"),
		).toBeInTheDocument();
	});

	it("hides description when null", () => {
		render(<GithubRepoCard data={{ ...baseRepo, description: null }} />);
		expect(
			screen.queryByText("A JavaScript library for building user interfaces"),
		).not.toBeInTheDocument();
	});

	it("shows language when present", () => {
		render(<GithubRepoCard data={baseRepo} />);
		expect(screen.getByText("JavaScript")).toBeInTheDocument();
	});

	it("hides language when null", () => {
		render(<GithubRepoCard data={{ ...baseRepo, language: null }} />);
		expect(screen.queryByText("JavaScript")).not.toBeInTheDocument();
	});

	it("language dot is hidden from assistive technology", () => {
		render(<GithubRepoCard data={baseRepo} />);
		const dot = screen
			.getByText("JavaScript")
			.closest("p")
			?.querySelector("[aria-hidden='true']");
		expect(dot).toBeInTheDocument();
	});

	it("renders stargazers count", () => {
		render(<GithubRepoCard data={baseRepo} />);
		expect(screen.getByText("1000")).toBeInTheDocument();
	});

	it("shows Popular badge when stargazers_count exceeds 50", () => {
		render(<GithubRepoCard data={baseRepo} />);
		expect(screen.getByText("Popular")).toBeInTheDocument();
	});

	it("hides Popular badge when stargazers_count is 50 or fewer", () => {
		render(<GithubRepoCard data={{ ...baseRepo, stargazers_count: 50 }} />);
		expect(screen.queryByText("Popular")).not.toBeInTheDocument();
	});

	it("shows language row when language is null but stargazers_count is present", () => {
		render(<GithubRepoCard data={{ ...baseRepo, language: null, stargazers_count: 1000 }} />);
		expect(screen.getByText("1000")).toBeInTheDocument();
	});

	it("shows license badge when license spdx_id is present", () => {
		render(<GithubRepoCard data={{ ...baseRepo, license: { spdx_id: "MIT" } as TGithubRepo["license"] }} />);
		expect(screen.getByText("MIT")).toBeInTheDocument();
	});

	it("hides license badge when license is null", () => {
		render(<GithubRepoCard data={{ ...baseRepo, license: null }} />);
		expect(screen.queryByText("MIT")).not.toBeInTheDocument();
	});
});
