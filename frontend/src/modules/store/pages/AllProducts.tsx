import InfoBar from '../components/InfoBar';
import StoreItem from '../components/StoreItem';
import { ShoppingCartProvider } from '../context/ShoppingCartContext';
import storeItems from '../data/items.json';

export default function AllProducts() {
	return (
		<ShoppingCartProvider>
			<div className="min-h-screen relative bg-gray-100 dark:bg-black py-8 md:px-10 px-5">
				<InfoBar />
				<h1 className="text-3xl font-bold text-center mb-6 text-sky-600 dark:text-sky-50">
					Store
				</h1>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
					{storeItems.map((item) => (
						<StoreItem key={item.id} {...item} />
					))}
				</div>
			</div>
		</ShoppingCartProvider>
	);
}
