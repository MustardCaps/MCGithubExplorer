
import GitHub_Invertocat_Black from "@/assets/GitHub_Invertocat_Black.svg?react";
import SearchBar from "@components/shared/SearchBar";

function App() {
	return (
		<div className="min-h-screen bg-background text-foreground p-8">
			<div className='max-w-2xl mx-auto mt-3'>
				<header className="mb-4">
					<GitHub_Invertocat_Black className="h-7 w-7" />
				</header>
				<SearchBar />
			</div>
		</div>
	);
}

export default App;
