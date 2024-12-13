import { RouteObject } from 'react-router-dom';

import AllProducts from './pages/AllProducts';

export const StoreRoutes: RouteObject[] = [
	{
		path: '',
		element: <AllProducts />
	}
];
