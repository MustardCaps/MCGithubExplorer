import { useState } from "react";
import { Combobox, ComboboxInput } from "@/components/ui/Combobox";
import useDebounce from "@/hooks/useDebounce";

function SearchBar() {
	const [query, setQuery] = useState("");

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
