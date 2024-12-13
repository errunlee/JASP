import { RouteObject } from 'react-router-dom';

import AllTutorials from './pages/AllTutorials';

export const TutorialsRoutes: RouteObject[] = [
	{
		path: '',
		element: <AllTutorials />
	}
];
