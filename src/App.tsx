import GitHub_Invertocat_White from "@/assets/GitHub_Invertocat_White.svg?react";
import SearchBar from "@/components/shared/SearchBar";

function App() {
	return (
		<div className="min-h-screen bg-background text-foreground p-8">
			<div className="max-w-2xl mx-auto mt-3">
				<header className="mb-4 flex items-end gap-3">
					<GitHub_Invertocat_White className="h-7 w-7" />
					<h1 className="text-lg">GitHub explorer</h1>
				</header>
				<SearchBar />
			</div>
		</div>
	);
}

export default App;
