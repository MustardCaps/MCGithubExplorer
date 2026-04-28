import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/Card";
import type { TGithubRepo } from "@/types/github";

interface IGithugRepoCardProps {
	data: TGithubRepo;
}

function GithubRepoCard({ data }: IGithugRepoCardProps) {
	return <Card className="mt-4 p-4">foo</Card>;
}

GithubRepoCard.displayName = "GithubRepoCard";

export default GithubRepoCard;
