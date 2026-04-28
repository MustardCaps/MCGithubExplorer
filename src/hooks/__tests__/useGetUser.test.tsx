import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useGetUser } from "@/hooks/useGetUser";
import { getGitHubUser } from "@/services/getGithubUser";

vi.mock("@/services/getGithubUser");
const mockGetGitHubUser = vi.mocked(getGitHubUser);

function createWrapper() {
	const queryClient = new QueryClient({
		defaultOptions: { queries: { retry: false } },
	});
	return function Wrapper({ children }: { children: React.ReactNode }) {
		return (
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		);
	};
}

describe("useGetUser", () => {
	it("is disabled when username is empty", () => {
		const { result } = renderHook(() => useGetUser(""), {
			wrapper: createWrapper(),
		});
		expect(result.current.fetchStatus).toBe("idle");
		expect(mockGetGitHubUser).not.toHaveBeenCalled();
	});

	it("fetches user data when username is provided", async () => {
		const mockData = { user: { id: 1, login: "gaearon" }, repos: [] };
		mockGetGitHubUser.mockResolvedValue(mockData as never);

		const { result } = renderHook(() => useGetUser("gaearon"), {
			wrapper: createWrapper(),
		});

		await waitFor(() => expect(result.current.isSuccess).toBe(true));
		expect(mockGetGitHubUser).toHaveBeenCalledWith("gaearon");
		expect(result.current.data).toEqual(mockData);
	});
});
