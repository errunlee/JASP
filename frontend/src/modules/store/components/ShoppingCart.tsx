import { Button } from '@/components/ui/button';
import { useShoppingCart } from '../context/useShoppingCart';
import CartItem from './CartItem';
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger
} from '@/components/ui/sheet';
import { X } from 'lucide-react';
import VisuallyHidden from '@/components/ui/VisuallyHidden';
import storeItems from '../data/items.json';

type ShoppingCartProps = {
	isOpen: boolean;
};

export default function ShoppingCart({ isOpen }: ShoppingCartProps) {
	const { openCart, closeCart, cartItems } = useShoppingCart();

	return (
		<Sheet>
			<SheetTrigger
				asChild
				onClick={openCart}
				className="absolute top-24 right-4 lg:right-6 w-16 h-16 bg-transparent border-none outline-none shadow-none hover:bg-transparent hover:shadow-none z-1 "
			>
				<Button className="dark hover:bg-transparent hover:outline-none dark:bg-transparent dark:hover:bg-transparent focus:outline-none">
					<VisuallyHidden>Open Cart </VisuallyHidden>
				</Button>
			</SheetTrigger>

			<SheetContent className="w-full md:w-[400px]">
				<SheetHeader>
					<SheetTitle>Your Cart</SheetTitle>
					<SheetDescription className="text-gray-800 dark:text-slate-50">
						Make changes to your cart here. Close (Esc) when you're done.
					</SheetDescription>
				</SheetHeader>
				<div className="mt-4">
					{cartItems.length == 0 ? (
						<h1 className="text-center mt-20 text-lg dark:text-slate-50">
							Your cart is empty!
						</h1>
					) : (
						cartItems.map((item) => <CartItem key={item.id} {...item} />)
					)}
					{cartItems.length != 0 ? (
						<h1 className="text-center font-bold mt-20 text-lg dark:text-slate-50">
							Total = Rs.{' '}
							{cartItems.reduce((total, cartItem) => {
								const item = storeItems.find((i) => i.id == cartItem.id);
								return total + (item?.price || 0) * cartItem.quantity;
							}, 0)}
						</h1>
					) : null}
				</div>
				<SheetFooter className="absolute bottom-0 left-0 right-0 flex justify-center">
					<SheetClose asChild={isOpen} onClick={closeCart}>
						<span
							role="button"
							className="w-full text-xl flex justify-center items-center gap-2 p-3 border outline outline-black outline-2 dark:outline-white dark:text-slate-50"
						>
							Close <X size={24} />
							<VisuallyHidden>Close Dialog Box</VisuallyHidden>
						</span>
					</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}
