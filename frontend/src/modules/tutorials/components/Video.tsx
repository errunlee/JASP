import VisuallyHidden from '@/components/ui/VisuallyHidden';

type VideoProps = {
	id: number;
	title: string;
	author: string;
	embedId: string;
	description: string;
	date: string;
	tags: string[];
};

export default function Video({
	id,
	title,
	author,
	embedId,
	description,
	date,
	tags
}: VideoProps) {
	return (
		<div
			key={id}
			className="p-2 bg-white dark:bg-gray-900 border-1 dark:border-2 border-emerald-700 dark:border-emerald-600 rounded-lg shadow-sm shadow-emerald-700 overflow-hidden"
		>
			<div className="p-2 border-2 rounded-sm">
				<iframe
					// width="400"
					// height="480"
					src={`https://www.youtube.com/embed/${embedId}`}
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
					title="Embedded youtube"
					className="w-full aspect-video"
				/>
			</div>

			<p className="flex justify-start mt-3 pl-4 gap-2 whitespace-normal text-slate-600 dark:text-slate-400">
				{tags.map((tag) => (
					<span>#{tag} </span>
				))}
			</p>

			<div className="p-4">
				<h2 className="text-lg font-semibold font-openSans text-gray-800 dark:text-slate-50">
					{title}
				</h2>
				<p className="font-parkinsans text-sm text-gray-600 dark:text-slate-100 mt-2">
					{description}
				</p>
				<div className="flex items-center justify-between mt-4">
					<span className="text-sm text-gray-500 dark:text-slate-50">
						By {author} on {date}
					</span>
					<a
						href="#"
						className="text-sm text-green-600 dark:text-emerald-300 font-semibold hover:underline"
					>
						Summary
						<VisuallyHidden>Get video summary</VisuallyHidden>
					</a>
				</div>
			</div>
		</div>
	);
}
