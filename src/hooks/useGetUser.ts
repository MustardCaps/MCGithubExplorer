import { useQuery } from "@tanstack/react-query";
import { getGitHubUser } from "@/services/getGithubUser";

export function useGetUser(username: string) {
	return useQuery({
		queryKey: ["users", username],
		queryFn: () => getGitHubUser(username),
		enabled: !!username,
	});
}
