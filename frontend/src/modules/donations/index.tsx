import { RouteObject } from 'react-router-dom';

import DonationHub from './pages/Donation';
import CreateDonation from './pages/CreateDonation';

export const DonationRoutes: RouteObject[] = [
	{
		path: '',
		element: <DonationHub />
	},
	{
		path: 'create',
		element: <CreateDonation />
	}
];
