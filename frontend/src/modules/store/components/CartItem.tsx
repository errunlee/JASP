import { Trash } from 'lucide-react';
import { useShoppingCart } from '../context/useShoppingCart';
import storeItems from '../data/items.json';

type CartItemProps = {
	id: number;
	quantity: number;
};

export default function CartItem({ id, quantity }: CartItemProps) {
	const { removeItemFromCart } = useShoppingCart();

	const item = storeItems.find((product) => product.id === id);

	if (item == null) return null;

	return (
		<article className="p-2 md:p-3 mt-2 flex gap-2 justify-between align-bottom h-24 border rounded-lg border-gray-400 dark:border-slate-50">
			<div className="mt-2 mb-2 flex align-baseline gap-3 md:gap-6">
				<img
					src={item.imgUrl}
					alt={item.description}
					className="h-full w-20 object-cover"
				/>
				<div className="dark:text-slate-50 flex flex-col self-center">
					<p className="text-sm lg:text-lg">{item.name}</p>
					<p>
						{quantity} * Rs. {item.price} = Rs.&nbsp;{item.price * quantity}
					</p>
				</div>
			</div>
			<div className="self-center" title="Remove from cart">
				<button
					className="text-xl text-red-700 dark:text-slate-50"
					onClick={() => removeItemFromCart(id)}
				>
					<Trash color={'currentColor'} />
				</button>
			</div>
		</article>
	);
}
