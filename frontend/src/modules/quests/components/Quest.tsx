import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Quest } from '../pages/Quests';

const QuestCard: React.FC<{
	quest: Quest;
	onProgress: (id: number) => void;
}> = ({ quest, onProgress }) => {
	return (
		<Card
			key={quest.id}
			className="space-y-4 max-w-[480px] w-full flex flex-col gap-4 bg-white dark:bg-gray-900 border border-emerald-700 dark:border-emerald-600 rounded-lg shadow-md shadow-emerald-700 overflow-hidden"
		>
			<CardHeader className="-mb-8">
				<CardTitle className="text-sm text-gray-700 dark:text-slate-200 ">
					{quest.title}
				</CardTitle>
			</CardHeader>
			<CardContent>
				<p className="mb-3 text-lg text-green-600 dark:text-emerald-300 font-semibold hover:underline">
					{quest.description}
				</p>

				<Progress
					value={(quest.progress / quest.goal) * 100}
					className="h-3 bg-gray-200 rounded-full"
				/>
				<p className="text-sm text-gray-500 dark:text-gray-100 mt-2">
					{quest.progress}/{quest.goal} completed
				</p>

				<Button
					onClick={() => onProgress(quest.id)}
					className="mt-4 w-full dark:hover:text-white"
					disabled={quest.progress >= quest.goal}
				>
					{quest.progress >= quest.goal ? 'Completed' : 'Update Progress'}
				</Button>
			</CardContent>
		</Card>
	);
};

export default QuestCard;
