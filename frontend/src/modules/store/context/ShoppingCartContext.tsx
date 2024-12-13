import { ReactNode, useState } from 'react';
import { ShoppingCartContext } from './useShoppingCart';
import ShoppingCart from '../components/ShoppingCart';
import useLocalStorage from '@/hooks/useLocalStorage';

type ShoppingCartProviderProps = {
	children: ReactNode;
};

type CartItem = {
	id: number;
	quantity: number;
};

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
	const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
		'shopping-cart',
		[]
	);
	const [isOpen, setIsOpen] = useState(false);

	const openCart = () => setIsOpen(true);
	const closeCart = () => setIsOpen(false);

	const cartQuantity = cartItems.reduce(
		(quantity, item) => item.quantity + quantity,
		0
	);

	const getTotalItemInCart = (id: number) => {
		return cartItems.find((item) => item.id === id)?.quantity || 0;
	};

	const increaseItemInCart = (id: number) => {
		setCartItems((currentItems) => {
			// no item in the cart
			if (currentItems.find((item) => item.id === id) == null) {
				return [...currentItems, { id, quantity: 1 }];
			} else {
				return currentItems.map((item) => {
					if (item.id === id) {
						return { ...item, quantity: item.quantity + 1 };
					} else {
						return item;
					}
				});
			}
		});
	};

	const decreaseItemInCart = (id: number) => {
		setCartItems((currentItems) => {
			if (currentItems.find((item) => item.id === id)?.quantity === 1) {
				console.log('decrease');

				return currentItems.filter((item) => item.id !== id);
			} else {
				return currentItems.map((item) => {
					if (item.id === id) {
						return { ...item, quantity: item.quantity - 1 };
					} else {
						return item;
					}
				});
			}
		});
	};

	const removeItemFromCart = (id: number) => {
		setCartItems((currentItems) => {
			return currentItems.filter((item) => item.id !== id);
		});
	};

	return (
		<ShoppingCartContext.Provider
			value={{
				getTotalItemInCart,
				increaseItemInCart,
				decreaseItemInCart,
				removeItemFromCart,
				cartItems,
				cartQuantity,
				openCart,
				closeCart
			}}
		>
			{children}
			<ShoppingCart isOpen={isOpen} />
		</ShoppingCartContext.Provider>
	);
}
