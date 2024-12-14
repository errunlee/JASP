import { RouteObject } from 'react-router-dom';

import Leaderboard from './pages/LeaderBoard';

export const LeaderboardRoutes: RouteObject[] = [
	{
		path: '',
		element: <Leaderboard contributors={[]} />
	}
];
