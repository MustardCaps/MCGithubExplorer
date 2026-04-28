import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import SearchBar from "@/components/shared/SearchBar";
import { useSearchSuggestions } from "@/hooks/useSearchSuggestions";

vi.mock("@/hooks/useSearchSuggestions");
const mockUseSearchSuggestions = vi.mocked(useSearchSuggestions);

const defaultHookReturn = {
	data: [],
	isFetching: false,
} as unknown as ReturnType<typeof useSearchSuggestions>;

function typeIntoSearch(value: string) {
	fireEvent.change(
		screen.getByPlaceholderText("Type in the name you wish to find"),
		{ target: { value } },
	);
}

describe("SearchBar", () => {
	beforeEach(() => {
		vi.useFakeTimers();
		mockUseSearchSuggestions.mockReturnValue(defaultHookReturn);
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it("renders the input with placeholder", () => {
		render(<SearchBar setUser={vi.fn()} />);
		expect(
			screen.getByPlaceholderText("Type in the name you wish to find"),
		).toBeInTheDocument();
	});

	it("does not show the results panel when input is empty", () => {
		render(<SearchBar setUser={vi.fn()} />);
		expect(screen.queryByText("Searching...")).not.toBeInTheDocument();
		expect(screen.queryByText(/No users found/)).not.toBeInTheDocument();
	});

	it("debounces the query before calling useSearchSuggestions", () => {
		render(<SearchBar setUser={vi.fn()} />);
		typeIntoSearch("react");
		expect(mockUseSearchSuggestions).toHaveBeenLastCalledWith("");
		act(() => vi.advanceTimersByTime(400));
		expect(mockUseSearchSuggestions).toHaveBeenLastCalledWith("react");
	});

	it("does not debounce early — query is still empty before delay", () => {
		render(<SearchBar setUser={vi.fn()} />);
		typeIntoSearch("react");
		act(() => vi.advanceTimersByTime(200));
		expect(mockUseSearchSuggestions).toHaveBeenLastCalledWith("");
	});
});
