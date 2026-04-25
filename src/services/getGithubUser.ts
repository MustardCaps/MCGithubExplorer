import { api } from "@/api/client";
import type { TGithubRepo, TGithubUser } from "@/types/github";

export const getGitHubUser = async (username: string) => {
	const [user, repos] = await Promise.all([
		api.get<TGithubUser>(`/users/${username}`),
		api.get<TGithubRepo[]>(`/users/${username}/repos`),
	]);
	return {
		user: user.data,
		repos: repos.data,
	};
};
