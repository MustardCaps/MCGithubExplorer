import { Card, CardContent } from "@/components/ui/Card";
import type { TGithubUser } from "@/types/github";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar";

interface IGithugRepoCardProps {
	user: TGithubUser;
}
function GithubUserCard({ user }: IGithugRepoCardProps) {
	const {
		avatar_url,
		bio,
		name,
		login,
		location,
		public_repos,
		followers,
		following,
	} = user;
	const initials = name?.slice(0, 2) ?? login.slice(0, 2);
	const userName = name ?? login;
	const capitalizedUserName =
		userName.charAt(0).toUpperCase() + userName.slice(1);
	const stats = [
		{ label: "repos", value: public_repos },
		{ label: "followers", value: followers },
		{ label: "following", value: following },
	];
	return (
		<Card className="mt-4" role="region" aria-label={`${userName} profile`}>
			<CardContent>
				<div className="flex items-start gap-4">
					<Avatar className="size-16">
						<AvatarImage src={avatar_url} alt={initials} />
						<AvatarFallback aria-hidden>{initials}</AvatarFallback>
					</Avatar>
					<div>
						<h2 className="text-lg font-bold">{capitalizedUserName}</h2>
						<p className="text-sm text-muted-foreground">
							{login} {location && `- ${location}`}
						</p>
						{bio && <p className="text-sm">{bio}</p>}
						<div className="text-xs mt-2 text-muted-foreground flex gap-4">
							{stats.map(({ label, value }) => (
								<span key={label}>
									<strong className="text-foreground">{value}</strong> {label}
								</span>
							))}
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

GithubUserCard.displayName = "GithubUserCard";

export default GithubUserCard;
