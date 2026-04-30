import { StarIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { getLanguageColor } from "@/lib/utils";
import type { TGithubRepo } from "@/types/github";
import { Badge } from "../ui/badge";

interface IGithugRepoCardProps {
	data: TGithubRepo;
}
function GithubRepoCard({
	data: { name, html_url, description, language, stargazers_count, license },
}: IGithugRepoCardProps) {
	return (
		<Card className="mt-4" role="article" aria-label={`${name} repository`}>
			<CardContent className="flex gap-2">
				<div className="flex-1">
					<p className="text-md">
						<a
							href={html_url}
							target="_blank"
							rel="noopener noreferrer"
							className="text-blue-400 hover:underline"
						>
							{name}
							<span className="sr-only">(opens in new tab)</span>
						</a>
					</p>
					{description && (
						<p className="text-xs text-muted-foreground">{description}</p>
					)}
					{(language || stargazers_count) && (
						<p className="text-xs mt-1 flex items-center gap-2">
							{language && (
								<>
									<span
										className="size-2 rounded-full inline-block"
										aria-hidden="true"
										style={{ backgroundColor: getLanguageColor(language) }}
									/>
									<span className="sr-only">Language: </span>
									{language}
								</>
							)}
							{stargazers_count > 50 && <Badge>Popular</Badge>}
						</p>
					)}
				</div>
				<div className="text-right">
					<p className="flex items-center justify-end gap-1">
						<StarIcon className="size-3" aria-hidden="true" />
						<span aria-hidden="true">{stargazers_count}</span>
						<span className="sr-only">{stargazers_count} stars</span>
					</p>
					{license?.spdx_id && (
						<Badge className="mt-1">
							<span className="sr-only">License: </span>
							{license.spdx_id}
						</Badge>
					)}
				</div>
			</CardContent>
		</Card>
	);
}

GithubRepoCard.displayName = "GithubRepoCard";

export default GithubRepoCard;
