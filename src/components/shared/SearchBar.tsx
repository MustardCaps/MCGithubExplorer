import { useState } from "react";
import { Combobox, ComboboxInput } from "@/components/ui/Combobox";
import useDebounce from "@/hooks/useDebounce";
import { useGetUser } from "@/hooks/useGetUser";
import { useSearchSuggestions } from "@/hooks/useSearchSuggestions";

function SearchBar() {
	const [query, setQuery] = useState("");
	const debouncedQuery = useDebounce(query, 400);

	const { isError, data, error, refetch, isFetching } =
		useSearchSuggestions(debouncedQuery);

	console.log({
		isError,
		data,
		error,
		refetch,
		isFetching,
	});

	return (
		<form onSubmit={(e) => e.preventDefault()}>
			<Combobox
				items={[]}
				value={query}
				onValueChange={(value) => setQuery(value ?? "")}
			>
				<ComboboxInput
					placeholder="Type in the name you wish to find"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					showClear
				/>
			</Combobox>
		</form>
	);
}

SearchBar.displayName = "SearchBar";

export default SearchBar;
