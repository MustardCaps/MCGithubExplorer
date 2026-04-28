import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import GithubUserCard from "@/components/shared/GithubUserCard";
import type { TGithubUser } from "@/types/github";

const baseUser: TGithubUser = {
	id: 1,
	login: "gaearon",
	name: "Dan Abramov",
	avatar_url: "https://example.com/avatar.jpg",
	html_url: "https://github.com/gaearon",
	bio: "Working on React",
	location: "London, UK",
	company: null,
	blog: null,
	twitter_username: null,
	public_repos: 296,
	public_gists: 82,
	followers: 90685,
	following: 174,
	created_at: "2011-05-25T18:18:31Z",
};

describe("GithubUserCard", () => {
	it("renders the username", () => {
		render(<GithubUserCard user={baseUser} />);
		expect(screen.getByText("Dan Abramov")).toBeInTheDocument();
	});

	it("falls back to login when name is null", () => {
		render(<GithubUserCard user={{ ...baseUser, name: null }} />);
		expect(screen.getByText("Gaearon")).toBeInTheDocument();
	});

	it("shows bio when present", () => {
		render(<GithubUserCard user={baseUser} />);
		expect(screen.getByText("Working on React")).toBeInTheDocument();
	});

	it("hides bio when null", () => {
		render(<GithubUserCard user={{ ...baseUser, bio: null }} />);
		expect(screen.queryByText("Working on React")).not.toBeInTheDocument();
	});

	it("shows location when present", () => {
		render(<GithubUserCard user={baseUser} />);
		expect(screen.getByText(/London, UK/)).toBeInTheDocument();
	});

	it("hides location when null", () => {
		render(<GithubUserCard user={{ ...baseUser, location: null }} />);
		expect(screen.queryByText(/London/)).not.toBeInTheDocument();
	});

	it("renders repo, follower, and following stats", () => {
		render(<GithubUserCard user={baseUser} />);
		expect(screen.getByText("296")).toBeInTheDocument();
		expect(screen.getByText("90685")).toBeInTheDocument();
		expect(screen.getByText("174")).toBeInTheDocument();
	});

	it("has correct aria-label on the region", () => {
		render(<GithubUserCard user={baseUser} />);
		expect(
			screen.getByRole("region", { name: "Dan Abramov profile" }),
		).toBeInTheDocument();
	});

	it("aria-label uses login when name is null", () => {
		render(<GithubUserCard user={{ ...baseUser, name: null }} />);
		expect(
			screen.getByRole("region", { name: "gaearon profile" }),
		).toBeInTheDocument();
	});
});
