import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/Card";
import { getLanguageColor } from "@/lib/utils";
import type { TGithubRepo } from "@/types/github";

interface IGithugRepoCardProps {
	data: TGithubRepo;
}

function GithubRepoCard({
	data: { name, html_url, description, language, stargazers_count },
}: IGithugRepoCardProps) {
	return (
		<Card className="mt-4" role="region" aria-label={`${name} repository`}>
			<CardContent className="flex">
				<div>
					<p>
						<a
							href={html_url}
							target="_blank"
							rel="noopener noreferrer"
							className="text-blue-400 hover:underline"
						>
							{name}
						</a>
					</p>
					{description && (
						<p className="text-xs text-muted-foreground">{description}</p>
					)}
					{language && (
						<p className="text-xs">
							<span
								className="size-2 rounded-full inline-block mr-1"
								aria-hidden="true"
								style={{ backgroundColor: getLanguageColor(language) }}
							/>
							{language}
						</p>
					)}
				</div>
			</CardContent>
		</Card>
	);
}

GithubRepoCard.displayName = "GithubRepoCard";

export default GithubRepoCard;
