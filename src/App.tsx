import { useState } from "react";
import GitHub_Invertocat_White from "@/assets/GitHub_Invertocat_White.svg?react";
import SearchBar from "@/components/shared/SearchBar";
import { useGetUser } from "@/hooks/useGetUser";
import GithubRepoCard from "./components/shared/GithubRepoCard";
import GithubUserCard from "./components/shared/GithubUserCard";

function App() {
	const [userData, setUserData] = useState("");

	const { data, isFetching } = useGetUser(userData);

	console.log("user", data?.user);
	console.log("repos", data?.repos);
	console.log("isFetching", isFetching);

	return (
		<div className="min-h-screen bg-background text-foreground p-8">
			<div className="max-w-2xl mx-auto mt-3">
				<header className="mb-4 flex items-end gap-3">
					<GitHub_Invertocat_White className="h-7 w-7" />
					<h1 className="text-lg">GitHub explorer</h1>
				</header>
				<SearchBar setUser={setUserData} />
				{data?.user && !isFetching && <GithubUserCard />}
				{!isFetching &&
					data?.repos?.map((repo) => (
						<GithubRepoCard key={repo.id} data={repo} />
					))}
			</div>
		</div>
	);
}

export default App;
