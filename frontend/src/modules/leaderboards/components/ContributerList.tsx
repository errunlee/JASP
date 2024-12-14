import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Contributor } from '../pages/LeaderBoard';

const ContributorList: React.FC<{ contributors: Contributor[] }> = ({
	contributors
}) => {
	return (
		<ul className="space-y-4 max-w-[480px] w-full flex flex-col gap-4">
			{contributors
				.sort((a, b) => b.points - a.points)
				.slice(0, 5)
				.map((contributor, index) => (
					<li
						key={contributor.id}
						className="w-full flex items-center justify-between mb-4 px-2 pb-2 shadow-green-200 shadow-sm hover:shadow-md dark:hover:shadow-none dark:shadow-none dark:outline-offset-2 dark:hover:outline dark:hover:outline-2 dark:hover:outline-green-500"
					>
						<div className="flex items-center gap-2">
							{index === 0 && (
								<span className="badge bg-gold mr-2 text-5xl">🥇</span>
							)}
							{index === 1 && (
								<span className="badge bg-silver mr-2 text-5xl">🥈</span>
							)}
							{index === 2 && (
								<span className="badge bg-bronze mr-2 text-5xl">🥉</span>
							)}
							{index > 2 && (
								<span className="text-4xl ml-5 md:ml-6 mr-6 text-green-600">
									{index + 1}
								</span>
							)}
							<Avatar className="mr-3 -ml-3 md:-ml-4 border-2 border-green-300">
								<AvatarImage
									src={contributor.avatarUrl}
									alt={contributor.name}
								/>
								<AvatarFallback>
									{contributor.name.substring(0, 2)}
								</AvatarFallback>
							</Avatar>
							<p className="font-semibold text-lg mr-2">{contributor.name}</p>
						</div>
						<div>
							<p className="block text-gray-500 text-lg">
								{contributor.points} XP
							</p>
						</div>
					</li>
				))}
		</ul>
	);
};

export default ContributorList;
