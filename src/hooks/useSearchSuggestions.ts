import { useQuery } from "@tanstack/react-query";
import { searchGitHubUsers } from "@/services/searchGithubUsers";

export const useSearchSuggestions = (query: string) => {
	return useQuery({
		queryKey: ["search", query],
		queryFn: () => searchGitHubUsers(query),
		enabled: query.length >= 2,
		staleTime: 1000 * 30,
	});
};
