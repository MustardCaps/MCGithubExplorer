type TGithubUser = {
	id: number;
	login: string;
	name: string | null;
	avatar_url: string;
	html_url: string;
	bio: string | null;
	location: string | null;
	company: string | null;
	blog: string | null;
	twitter_username: string | null;
	public_repos: number;
	public_gists: number;
	followers: number;
	following: number;
	created_at: string;
};

type TGithubRepo = {
	id: number;
	name: string;
	full_name: string;
	description: string | null;
	html_url: string;
	homepage: string | null;
	language: string | null;
	fork: boolean;
	forks_count: number;
	stargazers_count: number;
	watchers_count: number;
	open_issues_count: number;
	topics: string[];
	archived: boolean;
	visibility: string;
	default_branch: string;
	created_at: string;
	updated_at: string;
	license: { name: string } | null;
};

type TGithubSearchUser = {
	id: number;
	login: string;
	avatar_url: string;
	html_url: string;
	type: string;
	score: number;
};

export type { TGithubRepo, TGithubSearchUser, TGithubUser };
