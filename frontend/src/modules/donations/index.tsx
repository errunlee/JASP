import { RouteObject } from 'react-router-dom';

import DonationHub from './pages/Donation';

export const DonationRoutes: RouteObject[] = [
	{
		path: '',
		element: <DonationHub />
	}
];
