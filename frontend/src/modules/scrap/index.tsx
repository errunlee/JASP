import { RouteObject } from 'react-router-dom';

import AllDealers from './pages/AllDealers';
import DealerDetails from './components/DealerDetails';
import { dealers } from './pages/delaersData';

export const ScrapDealersRoutes: RouteObject[] = [
	{
		path: '',
		element: < AllDealers/>
	},
	{ path: 'dealers/:dealerId', element: <DealerDetails dealer={dealers[0]}/> },
	
];
