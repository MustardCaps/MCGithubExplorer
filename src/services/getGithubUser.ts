import { api } from "@/api/client";

export const getGitHubUser = async (username: string) => {
	const [user, repos] = await Promise.all([
		api.get(`/users/${username}`),
		api.get(`/users/${username}/repos`),
	]);
	return {
		user: user.data,
		repos: repos.data,
	};
};
