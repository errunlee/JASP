import { RouteObject } from 'react-router-dom';

import VehicleLocation from './pages/Vehicle';
import StorytellingPage from '../StoryTelling';

export const VehiclesRoutes: RouteObject[] = [
	{
		path: '',
		element: <VehicleLocation />
	},
	{
		path: '/vehicle/story',
		element: <StorytellingPage />
	}
];
