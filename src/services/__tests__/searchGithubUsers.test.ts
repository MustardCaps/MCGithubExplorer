import { describe, expect, it, vi } from "vitest";
import { api } from "@/api/client";
import { searchGitHubUsers } from "@/services/searchGithubUsers";

vi.mock("@/api/client", () => ({
	api: { get: vi.fn() },
}));
const mockGet = vi.mocked(api.get);

describe("searchGitHubUsers", () => {
	it("calls the search endpoint with correct params", async () => {
		mockGet.mockResolvedValue({ data: { items: [] } });

		await searchGitHubUsers("gae");

		expect(mockGet).toHaveBeenCalledWith("/search/users", {
			params: { q: "gae", per_page: 10 },
		});
	});

	it("returns the items array from the response", async () => {
		const items = [{ id: 1, login: "gaearon" }];
		mockGet.mockResolvedValue({ data: { items } });

		const result = await searchGitHubUsers("gae");
		expect(result).toEqual(items);
	});
});
