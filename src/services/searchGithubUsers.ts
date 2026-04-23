import { api } from "@/api/client";

export const searchGitHubUsers = async (query: string) => {
	const { data } = await api.get(`/search/users`, {
		params: { q: query, per_page: 10 },
	});
	return data.items;
};
