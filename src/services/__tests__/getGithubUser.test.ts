import { beforeEach, describe, expect, it, vi } from "vitest";
import { api } from "@/api/client";
import { getGitHubUser } from "@/services/getGithubUser";

vi.mock("@/api/client", () => ({
	api: { get: vi.fn() },
}));
const mockGet = vi.mocked(api.get);

describe("getGitHubUser", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("fetches user and repos in parallel", async () => {
		mockGet
			.mockResolvedValueOnce({ data: { id: 1, login: "gaearon" } })
			.mockResolvedValueOnce({ data: [{ id: 1, name: "react" }] });

		const result = await getGitHubUser("gaearon");

		expect(mockGet).toHaveBeenCalledWith("/users/gaearon");
		expect(mockGet).toHaveBeenCalledWith("/users/gaearon/repos");
		expect(result.user).toEqual({ id: 1, login: "gaearon" });
		expect(result.repos).toEqual([{ id: 1, name: "react" }]);
	});

	it("makes exactly two requests", async () => {
		mockGet
			.mockResolvedValueOnce({ data: {} })
			.mockResolvedValueOnce({ data: [] });

		await getGitHubUser("gaearon");
		expect(mockGet).toHaveBeenCalledTimes(2);
	});
});
