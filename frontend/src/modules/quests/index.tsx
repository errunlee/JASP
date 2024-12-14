import { RouteObject } from 'react-router-dom';
import Quests from './pages/Quests';

export const QuestRoutes: RouteObject[] = [
	{
		path: '',
		element: <Quests />
	}
];
