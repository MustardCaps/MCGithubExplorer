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
	it("renders without crashing", () => {
		render(<GithubRepoCard data={baseRepo} />);
		expect(screen.getByText("foo")).toBeInTheDocument();
	});
});
