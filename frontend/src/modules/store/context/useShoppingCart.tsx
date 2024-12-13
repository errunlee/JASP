import { createContext, useContext } from 'react';

type CartItem = {
	id: number;
	quantity: number;
};

type ShoppingCartContext = {
	getTotalItemInCart: (id: number) => number;
	increaseItemInCart: (id: number) => void;
	decreaseItemInCart: (id: number) => void;
	removeItemFromCart: (id: number) => void;
	openCart: () => void;
	closeCart: () => void;
	cartQuantity: number;
	cartItems: CartItem[];
};

export const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
	return useContext(ShoppingCartContext);
}
