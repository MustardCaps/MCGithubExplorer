import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import {
	Combobox,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxInput,
	ComboboxItem,
	ComboboxList,
} from "@/components/ui/Combobox";
import useDebounce from "@/hooks/useDebounce";
import { useSearchSuggestions } from "@/hooks/useSearchSuggestions";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar";

type ISearchBarParams = {
	setUser: (data: string) => void;
};

function SearchBar({ setUser }: ISearchBarParams) {
	const [query, setQuery] = useState("");
	const debouncedQuery = useDebounce(query, 400);

	const { data, isFetching } = useSearchSuggestions(debouncedQuery);

	return (
		<form onSubmit={(e) => e.preventDefault()}>
			<Combobox
				items={data}
				value={query}
				onValueChange={(value) => {
					setQuery(value ?? "");
					setUser(value ?? "");
				}}
			>
				<ComboboxInput
					placeholder="Type in the name you wish to find"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					showClear
				/>
				{debouncedQuery && (
					<ComboboxContent>
						{isFetching ? (
							<div className="flex items-center gap-2 p-2">
								<LoaderCircle
									className="size-4 animate-spin text-muted-foreground"
									aria-hidden="true"
								/>
								<span>Searching...</span>
							</div>
						) : debouncedQuery ? (
							<ComboboxEmpty>
								No users found for "{debouncedQuery}".
							</ComboboxEmpty>
						) : null}
						<ComboboxList>
							{({ id, login, avatar_url }) => {
								const initials = login.slice(0, 2);
								return (
									<ComboboxItem key={id} value={login}>
										<Avatar className="size-8 mr-2">
											<AvatarImage src={avatar_url} alt={initials} />
											<AvatarFallback aria-hidden>{initials}</AvatarFallback>
										</Avatar>
										{login}
									</ComboboxItem>
								);
							}}
						</ComboboxList>
					</ComboboxContent>
				)}
			</Combobox>
		</form>
	);
}

SearchBar.displayName = "SearchBar";

export default SearchBar;
