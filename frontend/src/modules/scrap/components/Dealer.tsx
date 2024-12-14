import { Link } from 'react-router-dom';

type Item = {
	name: string;
	price: number;
};
export type DealerProps = {
	id: number;
	name: string;
	location: string;
	description: string;
	image?: string;
	prices: Item[];
};

type Props = {
	dealer: DealerProps;
};

const Dealer = ({ dealer }: Props) => {
	return (
		<div
			key={dealer.id}
			className="bg-white dark:bg-gray-900 border border-emerald-700 dark:border-emerald-600 rounded-lg shadow-md overflow-hidden"
		>
			{/* Blog Image */}
			{dealer.image && (
				<img
					src={dealer.image}
					alt={dealer.name}
					className="w-full h-48 object-cover"
				/>
			)}

			{/* Blog Title */}
			<div className="p-4">
				<h2 className="text-lg font-roboto font-semibold text-gray-800 dark:text-slate-50">
					{dealer.name} - {dealer.location}
				</h2>

				{/* Blog Content Preview */}
				<div className="mt-4">
					<p className="text-sm text-gray-700 dark:text-slate-200 truncate">
						{dealer.description.substring(0, 150)}...
					</p>
				</div>

				{/* Meta Information */}
				<div className="flex items-center justify-between mt-4">
					<Link
						to={`./dealers/${dealer.id}`}
						className="text-sm text-green-600 dark:text-emerald-300 font-semibold hover:underline"
					>
						More Information
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Dealer;
