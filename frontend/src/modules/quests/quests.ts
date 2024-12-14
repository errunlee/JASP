interface Quest {
	id: number;
	title: string;
	description: string;
	goal: number; // Total steps to complete the quest
	progress: number; // Current progress
}

export const weeklyQuests: Quest[] = [
	{
		id: 1,
		title: 'Host a Cleanup Event',
		description: 'Organize a community cleanup event in your area.',
		goal: 1,
		progress: 0
	},
	{
		id: 2,
		title: 'Volunteer in 3 Events',
		description: 'Participate in three local volunteer programs.',
		goal: 3,
		progress: 1
	},
	{
		id: 3,
		title: 'Make 3 donations',
		description:
			'Make at least 3 donations. Help at least 3 individuals with unused stuffs.',
		goal: 10,
		progress: 5
	}
];

export const monthlyQuests: Quest[] = [
	{
		id: 1,
		title: 'Host a Cleanup Event',
		description: 'Organize a community cleanup event in your area.',
		goal: 1,
		progress: 0
	},
	{
		id: 2,
		title: 'Volunteer in 3 Events',
		description: 'Participate in three local volunteer programs.',
		goal: 3,
		progress: 1
	},
	{
		id: 3,
		title: 'Make 3 donations',
		description:
			'Make at least 3 donations. Help at least 3 individuals with unused stuffs.',
		goal: 10,
		progress: 5
	}
];
