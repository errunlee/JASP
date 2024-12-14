type Props = {
	id: number;
	title: string;
	description: string;
	author: string;
	date: string;
	image: string;
	targetAmount: number; // Target amount for the campaign
	collectedAmount: number; // Amount already collected
	targetMembers: number; // Target number of participants
	currentMembers: number;
};
export const campaigns: Props[] = [
	{
		id: 1,
		title: 'Save the Rainforest',
		description: 'Help us save the rainforest by donating to our campaign.',
		author: 'John Doe',
		date: '2023-10-01',
		image: 'rainforest.jpg',
		targetAmount: 50000,
		collectedAmount: 15000,
		targetMembers: 1000,
		currentMembers: 300
	},
	{
		id: 2,
		title: 'Clean the Oceans',
		description:
			'Join our efforts to clean the oceans and protect marine life.',
		author: 'Jane Smith',
		date: '2023-09-15',
		image: 'ocean.jpg',
		targetAmount: 75000,
		collectedAmount: 45000,
		targetMembers: 2000,
		currentMembers: 1200
	},
	{
		id: 3,
		title: 'Build a School',
		description: 'Help us build a school in a remote village.',
		author: 'Alice Johnson',
		date: '2023-08-20',
		image: 'school.jpg',
		targetAmount: 100000,
		collectedAmount: 60000,
		targetMembers: 500,
		currentMembers: 350
	}
];

export default campaigns;
