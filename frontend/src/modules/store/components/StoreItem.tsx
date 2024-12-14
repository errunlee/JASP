import { Button } from '@/components/ui/button';
import VisuallyHidden from '@/components/ui/VisuallyHidden';
import { Trash } from 'lucide-react';
import { useShoppingCart } from '../context/useShoppingCart';

type StoreItemProps = {
	id: number;
	name: string;
	price: number;
	imgUrl: string;
	description: string;
	stock: number;
};

export default function StoreItem({
	id,
	name,
	price,
	imgUrl,
	description,
	stock
}: StoreItemProps) {
	const {
		getTotalItemInCart,
		increaseItemInCart,
		decreaseItemInCart,
		removeItemFromCart
	} = useShoppingCart();

	const quantity = getTotalItemInCart(id);

	let className: string & ('bg-red-800' | 'bg-green-800' | 'bg-amber-700') =
		'bg-green-800';
	className =
		stock >= 10 ? 'bg-green-800' : stock == 0 ? 'bg-red-800' : 'bg-amber-700';

	const stockStatus =
		stock >= 10 ? 'Available' : stock == 0 ? 'Sold out' : 'Low stock';

	return (
		<article className="p-5 md:p-2 relative flex w-full flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md dark:bg-black">
			<div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
				<img
					src={imgUrl}
					alt={description}
					className="w-full h-full object-cover"
				/>
				<span
					className={`absolute top-0 left-0 m-2 rounded-full px-2 text-center text-sm font-medium text-slate-50 ${className}`}
				>
					{stockStatus}
				</span>
			</div>
			<div className="mt-4 px-5 pb-5">
				<p className="text-xl font-parkinsans tracking-tight text-slate-900 dark:text-slate-50">
					{name}
				</p>

				<div className="mt-2 mb-5 flex items-center justify-between">
					<p>
						<span className="text-xl font-bold text-slate-900 dark:text-slate-50">
							Rs.{price}s
						</span>
					</p>
					<div className="flex items-center md:ml-2">
						<svg
							aria-hidden="true"
							className="h-5 w-5 text-yellow-500"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
						</svg>
						<svg
							aria-hidden="true"
							className="h-5 w-5 text-yellow-500"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
						</svg>
						<svg
							aria-hidden="true"
							className="h-5 w-5 text-yellow-500"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
						</svg>
						<svg
							aria-hidden="true"
							className="h-5 w-5 text-yellow-500"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
						</svg>
						<svg
							aria-hidden="true"
							className="h-5 w-5 text-yellow-500"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
						</svg>
						<span className="mr-1 ml-1 md:ml-2 lg:ml-3 rounded bg-yellow-500 px-2.5 py-0.5 text-xs font-semibold">
							5.0
						</span>
					</div>
				</div>
				<div className="flex justify-center items-center ">
					{quantity == 0 ? (
						<Button
							variant={'outline'}
							className="text-black dark:text-slate-50 dark:border-slate-50"
							onClick={() => increaseItemInCart(id)}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="mr-2 h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth="2"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
								/>
							</svg>
							Add to cart
						</Button>
					) : (
						<div className="w-full flex justify-between items-center">
							<div>
								<Button
									variant={'outline'}
									title="Remove one"
									className="text-xl bg-white text-black dark:text-black dark:border-white"
									onClick={() => decreaseItemInCart(id)}
								>
									-<VisuallyHidden>Remove one</VisuallyHidden>
								</Button>
								<span className="ml-3 mr-3 text-xl font-bold dark:text-slate-50">
									{quantity}
								</span>
								<Button
									variant={'outline'}
									title="Add one"
									className="text-xl bg-white text-black dark:text-black dark:border-white "
									onClick={() => increaseItemInCart(id)}
								>
									+<VisuallyHidden>Add one</VisuallyHidden>
								</Button>
							</div>
							<Button
								// variant={'destructive'}
								className="text-xl bg-white text-black hover:bg-slate-50 outline outline-2 outline-red-800 dark:text-white dark:hover:bg-gray-800 dark:bg-black dark:border-white dark:outline-white"
								title="Remove from cart"
								onClick={() => removeItemFromCart(id)}
							>
								<Trash size={32} className="text-red-900 dark:text-white" />
								<VisuallyHidden>Empty Cart</VisuallyHidden>
							</Button>
						</div>
					)}
				</div>
			</div>
		</article>
	);
}
