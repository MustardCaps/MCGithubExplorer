import { api } from "@/api/client";

export const getGitHubUser = async (username: string) => {
	const { data } = await api.get(`/users/${username}`);
	return data;
};
