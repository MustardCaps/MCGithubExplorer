import { api } from "@/api/client";
import type { TGithubSearchUser } from "@/types/github";

export const searchGitHubUsers = async (query: string) => {
	const { data } = await api.get<{ items: TGithubSearchUser[] }>(`/search/users`, {
		params: { q: query, per_page: 10 },
	});
	return data.items;
};
