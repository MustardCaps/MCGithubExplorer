type TGithubUser = {
	id: number;
	login: string;
	name: string;
	avatar_url: string;
	bio: string;
	public_repos: number;
	followers: number;
	following: number;
};

type TGithubRepo = {
	id: number;
	name: string;
	full_name: string;
	description: string | null;
	html_url: string;
	stargazers_count: number;
	language: string | null;
	fork: boolean;
};

export type { TGithubRepo, TGithubUser };
