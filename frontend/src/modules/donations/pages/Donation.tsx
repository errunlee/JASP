import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card';
import React from 'react';

const DonationHub: React.FC = () => {
	const dummyData = [
		{
			id: 1,
			category: 'Books',
			title: 'Gently Used Novels',
			condition: 'Good',
			description: 'A collection of classic novels in good condition.',
			image:
				'https://images.pexels.com/photos/762687/pexels-photo-762687.jpeg?auto=compress&cs=tinysrgb&w=800'
		},
		{
			id: 2,
			category: 'Clothes',
			title: 'Winter Jackets',
			condition: 'Almost New',
			description:
				'Warm winter jacket for adult male. Size L. Used a few times only.',
			image:
				'https://images-cdn.ubuy.co.in/6538937984374c56f60a8e2e-junge-denim-jacket-men-fleece-jacket.jpg'
		},
		{
			id: 3,
			category: 'Toys',
			title: 'Kids Toys',
			condition: 'Used',
			description: 'A variety of toys suitable for children aged 3-8.',
			image:
				'https://images.pexels.com/photos/12211/pexels-photo-12211.jpeg?auto=compress&cs=tinysrgb&w=800'
		}
	];

	return (
		<div className="min-h-screen dark:bg-gray-900 py-8 md:px-10 px-5">
			<div className="max-w-6xl mx-auto">
				<header className="mb-8">
					<h1 className="text-3xl font-roboto tracking-wider font-bold text-center mb-3 text-emerald-600 dark:text-emerald-400">
						Donation Hub
					</h1>

					<p className="text-center mt-8 md:mt-4 font-semibold text-gray-800 dark:text-slate-50">
						Find items to donate or request what you need.
					</p>
					<div className="mt-4 flex items-center justify-center lg:justify-end space-x-4">
						<input
							placeholder="Search for items..."
							className="w-full max-w-[300px] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-emerald-500"
							name={'search'}
						/>
						<Button>Search</Button>
					</div>
				</header>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{dummyData.map((item) => (
						<Card
							key={item.id}
							className="bg-white dark:bg-gray-900 border border-emerald-700 dark:border-emerald-600 rounded-lg shadow-sm shadow-emerald-700 overflow-hidden flex flex-col"
						>
							<CardHeader>
								<img
									src={item.image}
									alt={item.title}
									className="w-full h-60 object-cover rounded-t-md"
								/>
							</CardHeader>
							<CardContent>
								<CardTitle className="text-lg font-semibold">
									{item.title}
								</CardTitle>
								<p className="text-sm mt-4 text-gray-700 dark:text-slate-200">
									Category: {item.category}
								</p>
								<p className="text-sm mt-3 mb-4 text-gray-700 dark:text-slate-200">
									Condition: {item.condition}
								</p>
								<p className="mt-2  text-sm text-gray-700 dark:text-slate-200">
									{item.description}
								</p>
							</CardContent>
							<CardFooter className="flex justify-between items-center">
								<Button
									variant="outline"
									className="dark:outline dark:outline-2 dark:outline-slate-100 dark:hover:bg-green-700"
								>
									Request
								</Button>
								<Button className="dark:hover:text-slate-50">
									Donate Similar
								</Button>
							</CardFooter>
						</Card>
					))}
				</div>
			</div>
			<h2 className="mt-12 text-xl font-roboto tracking-wider font-bold text-center mb-6 text-emerald-600 dark:text-emerald-400">
				Together, We Transform Waste into Hope
			</h2>
		</div>
	);
};

export default DonationHub;
