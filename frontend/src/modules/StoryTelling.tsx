import React from 'react';
import {
	Card,
	CardHeader,
	CardContent,
	CardFooter
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Dummy Data
const stories = [
	{
		id: 1,
		title: 'The Adventures of Recycly and Compo',
		description:
			'Follow Recycly the bottle and Compo the banana peel on their journey to teach kids about recycling!',
		category: 'Environment',
		progress: 60,
		image: 'https://via.placeholder.com/150',
		audio: '#' // Placeholder for audio narration link
	},
	{
		id: 2,
		title: 'Saving the River',
		description:
			'Learn how a group of kids saved their local river by organizing a cleanup event.',
		category: 'Adventure',
		progress: 20,
		image: 'https://via.placeholder.com/150',
		audio: '#'
	},
	{
		id: 3,
		title: 'The Little Plastic Bag',
		description:
			'Discover the journey of a plastic bag and how it finds its way to recycling.',
		category: 'Fables',
		progress: 0,
		image: 'https://via.placeholder.com/150',
		audio: '#'
	}
];

const StoryCard: React.FC<{ story: (typeof stories)[0] }> = ({ story }) => {
	return (
		<Card className="w-full md:w-80 shadow-md">
			<CardHeader>
				<img
					src={story.image}
					alt={story.title}
					className="w-full h-40 object-cover rounded-t"
				/>
				<h2 className="text-xl font-bold mt-2">{story.title}</h2>
				<p className="text-gray-600 text-sm">Category: {story.category}</p>
			</CardHeader>
			<CardContent>
				<p className="text-gray-800 text-sm mb-4">{story.description}</p>
				<Progress value={story.progress} className="mb-2" />
				<p className="text-sm text-gray-600">Progress: {story.progress}%</p>
			</CardContent>
			<CardFooter className="flex justify-between">
				<Button variant="outline" size="sm">
					Continue
				</Button>
				<Button variant="outline" size="sm" asChild>
					<a href={story.audio}>Listen</a>
				</Button>
			</CardFooter>
		</Card>
	);
};

const StorytellingPage: React.FC = () => {
	return (
		<div className="p-6 bg-gray-100 min-h-screen">
			<header className="text-center mb-8">
				<h1 className="text-4xl font-bold text-green-600">
					Storytelling for Kids
				</h1>
				<p className="text-gray-700 mt-2">
					Engaging stories to learn about the environment, adventures, and more!
				</p>
			</header>

			<Tabs defaultValue="all">
				<TabsList className="justify-center mb-4">
					<TabsTrigger value="all">All Stories</TabsTrigger>
					<TabsTrigger value="environment">Environment</TabsTrigger>
					<TabsTrigger value="adventure">Adventure</TabsTrigger>
					<TabsTrigger value="fables">Fables</TabsTrigger>
				</TabsList>

				<TabsContent value="all">
					<div className="flex flex-wrap gap-6 justify-center">
						{stories.map((story) => (
							<StoryCard key={story.id} story={story} />
						))}
					</div>
				</TabsContent>

				<TabsContent value="environment">
					<div className="flex flex-wrap gap-6 justify-center">
						{stories
							.filter((story) => story.category === 'Environment')
							.map((story) => (
								<StoryCard key={story.id} story={story} />
							))}
					</div>
				</TabsContent>

				<TabsContent value="adventure">
					<div className="flex flex-wrap gap-6 justify-center">
						{stories
							.filter((story) => story.category === 'Adventure')
							.map((story) => (
								<StoryCard key={story.id} story={story} />
							))}
					</div>
				</TabsContent>

				<TabsContent value="fables">
					<div className="flex flex-wrap gap-6 justify-center">
						{stories
							.filter((story) => story.category === 'Fables')
							.map((story) => (
								<StoryCard key={story.id} story={story} />
							))}
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default StorytellingPage;
