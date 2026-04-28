import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useSearchSuggestions } from "@/hooks/useSearchSuggestions";
import { searchGitHubUsers } from "@/services/searchGithubUsers";

vi.mock("@/services/searchGithubUsers");
const mockSearchGitHubUsers = vi.mocked(searchGitHubUsers);

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

describe("useSearchSuggestions", () => {
	it("is disabled when query is less than 2 characters", () => {
		const { result } = renderHook(() => useSearchSuggestions("a"), {
			wrapper: createWrapper(),
		});
		expect(result.current.fetchStatus).toBe("idle");
		expect(mockSearchGitHubUsers).not.toHaveBeenCalled();
	});

	it("is disabled when query is empty", () => {
		const { result } = renderHook(() => useSearchSuggestions(""), {
			wrapper: createWrapper(),
		});
		expect(result.current.fetchStatus).toBe("idle");
		expect(mockSearchGitHubUsers).not.toHaveBeenCalled();
	});

	it("fetches when query is 2 or more characters", async () => {
		mockSearchGitHubUsers.mockResolvedValue([{ id: 1, login: "gaearon" }] as never);

		const { result } = renderHook(() => useSearchSuggestions("ga"), {
			wrapper: createWrapper(),
		});

		await waitFor(() => expect(result.current.isSuccess).toBe(true));
		expect(mockSearchGitHubUsers).toHaveBeenCalledWith("ga");
	});
});
