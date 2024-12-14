import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React from 'react';
import ContributorList from '../components/ContributerList';

export interface Contributor {
	id: number;
	name: string;
	points: number;
	avatarUrl: string;
}
const volunteers: Contributor[] = [
	{
		id: 1,
		name: 'John Cena',
		points: 100,
		avatarUrl: 'https://randomuser.me/api/portraits'
	},
	{
		id: 2,
		name: 'The Undertaker',
		points: 200,
		avatarUrl: 'https://randomuser.me/api/portraits'
	},
	{
		id: 3,
		name: 'Rajesh Hamal',
		points: 300,
		avatarUrl: 'https://randomuser.me/api/portraits'
	},
	{
		id: 4,
		name: 'Bhakta Raj Acharya',
		points: 400,
		avatarUrl: 'https://randomuser.me/api/portraits'
	},
	{
		id: 5,
		name: 'Gulam Ali',
		points: 500,
		avatarUrl: 'https://randomuser.me/api/portraits'
	},
	{
		id: 6,
		name: 'Aruna Lama',
		points: 600,
		avatarUrl: 'https://randomuser.me/api/portraits'
	},
	{
		id: 7,
		name: 'Nusrat Fateh Ali Khan',
		points: 700,
		avatarUrl: 'https://randomuser.me/api/portraits'
	},
	{
		id: 9,
		name: 'laxmi Prasad Devkota',
		points: 900,
		avatarUrl: 'https://randomuser.me/api/portraits'
	},
	{
		id: 10,
		name: 'Bhanubhakta Acharya',
		points: 1000,
		avatarUrl: 'https://randomuser.me/api/portraits'
	}
];

const sponsors: Contributor[] = [
	{
		id: 1,
		name: 'Elon Musk',
		points: 1500,
		avatarUrl: 'https://randomuser.me/api/portraits'
	},
	{
		id: 2,
		name: 'Jeff Bezos',
		points: 1400,
		avatarUrl: 'https://randomuser.me/api/portraits'
	},
	{
		id: 3,
		name: 'Bill Gates',
		points: 1300,
		avatarUrl: 'https://randomuser.me/api/portraits'
	},
	{
		id: 4,
		name: 'Warren Buffet',
		points: 1200,
		avatarUrl: 'https://randomuser.me/api/portraits'
	},
	{
		id: 5,
		name: 'Mark Zuckerberg',
		points: 1100,
		avatarUrl: 'https://randomuser.me/api/portraits'
	},
	{
		id: 6,
		name: 'Larry Page',
		points: 1000,
		avatarUrl: 'https://randomuser.me/api/portraits'
	},
	{
		id: 7,
		name: 'Sergey Brin',
		points: 900,
		avatarUrl: 'https://randomuser.me/api/portraits'
	},
	{
		id: 8,
		name: 'Steve Jobs',
		points: 800,
		avatarUrl: 'https://randomuser.me/api/portraits'
	},
	{
		id: 9,
		name: 'Larry Ellison',
		points: 700,
		avatarUrl: 'https://randomuser.me/api/portraits'
	},
	{
		id: 10,
		name: 'Michael Bloomberg',
		points: 600,
		avatarUrl: 'https://randomuser.me/api/portraits'
	}
];

interface LeaderboardProps {
	contributors: Contributor[];
}

const Leaderboard: React.FC<LeaderboardProps> = () => {
	return (
		<div className="grid grid-cols-1 place-items-center gap-4 p-2 md:p-4">
			<h2 className="text-2xl font-bold mb-8 text-center">Top Contributors</h2>
			<Tabs defaultValue="volunteers" className="w-[90%] max-w-[480px]">
				<TabsList className="grid w-full grid-cols-2 mb-8 h-12">
					<TabsTrigger
						value="volunteers"
						className="text-lg text-black dark:text-white data-[state=active]:text-emerald-800 data-[state=active]:font-semibold data-[state=active]:border-b-2 data-[state=active]:border-emerald-500"
					>
						Top Volunteers
					</TabsTrigger>
					<TabsTrigger
						value="sponsors"
						className="text-lg text-black dark:text-white data-[state=active]:text-emerald-800 data-[state=active]:font-semibold data-[state=active]:border-b-2 data-[state=active]:border-emerald-500"
					>
						Top Sponsors
					</TabsTrigger>
				</TabsList>
				<TabsContent value="volunteers">
					<ContributorList contributors={volunteers} />
				</TabsContent>
				<TabsContent value="sponsors">
					<ContributorList contributors={sponsors} />
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default Leaderboard;
