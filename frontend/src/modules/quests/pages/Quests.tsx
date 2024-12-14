import React, { useState } from 'react';
import QuestCard from '../components/Quest';
import { weeklyQuests, monthlyQuests } from '../quests';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
export interface Quest {
	id: number;
	title: string;
	description: string;
	goal: number; // Total steps to complete the quest
	progress: number; // Current progress
}

const Quests: React.FC = () => {
	// const [quests, setQuests] = useState<Quest[]>([
	// 	{
	// 		id: 1,
	// 		title: 'Host a Cleanup Event',
	// 		description: 'Organize a community cleanup event in your area.',
	// 		goal: 1,
	// 		progress: 0
	// 	},
	// 	{
	// 		id: 2,
	// 		title: 'Volunteer in 3 Events',
	// 		description: 'Participate in three local volunteer programs.',
	// 		goal: 3,
	// 		progress: 1
	// 	},
	// 	{
	// 		id: 3,
	// 		title: 'Make 3 donations',
	// 		description:
	// 			'Make at least 3 donations. Help at least 3 individuals with unused stuffs.',
	// 		goal: 10,
	// 		progress: 5
	// 	}
	// ]);

	const [weekly, setWeekly] = useState<Quest[]>(weeklyQuests);
	const [monthly, setMonthly] = useState<Quest[]>(monthlyQuests);

	const handleWeeklyProgress = (id: number) => {
		setWeekly((prevQuests) =>
			prevQuests.map((quest) =>
				quest.id === id && quest.progress < quest.goal
					? { ...quest, progress: quest.progress + 1 }
					: quest
			)
		);
	};
	const handleMonthlyProgress = (id: number) => {
		setMonthly((prevQuests) =>
			prevQuests.map((quest) =>
				quest.id === id && quest.progress < quest.goal
					? { ...quest, progress: quest.progress + 1 }
					: quest
			)
		);
	};

	return (
		<div className="grid grid-cols-1 place-items-center gap-4 p-2 md:p-4 ">
			<header className="mb-8">
				<h1 className="text-3xl font-roboto tracking-wide font-bold text-center mb-6 text-emerald-600 dark:text-emerald-400">
					Quest Page
				</h1>
				<p className="text-lg text-gray-700 dark:text-slate-200">
					Participate in weekly and monthly quests to make a positive impact.
				</p>
			</header>
			<Tabs defaultValue="weekly" className="w-[90%] max-w-[480px]">
				<TabsList className="grid w-full grid-cols-2 mb-8 h-12">
					<TabsTrigger
						value="weekly"
						className="text-lg font-parkinsans text-black dark:text-white data-[state=active]:text-emerald-800 data-[state=active]:font-semibold data-[state=active]:border-b-2 data-[state=active]:border-emerald-500"
					>
						Weekly Quests
					</TabsTrigger>
					<TabsTrigger
						value="monthly"
						className="text-lg font-parkinsans text-black dark:text-white data-[state=active]:text-emerald-800 data-[state=active]:font-semibold data-[state=active]:border-b-2 data-[state=active]:border-emerald-500"
					>
						Monthly Quests
					</TabsTrigger>
				</TabsList>
				<TabsContent value="weekly" className="grid grid-cols-1 gap-4">
					{weekly.map((quest) => (
						<QuestCard quest={quest} onProgress={handleWeeklyProgress} />
					))}
				</TabsContent>
				<TabsContent value="monthly" className="grid grid-cols-1 gap-4">
					{monthly.map((quest) => (
						<QuestCard quest={quest} onProgress={handleMonthlyProgress} />
					))}
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default Quests;
