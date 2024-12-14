import Layout from '@/components/layout/Layout';
import LoginForm from '@/modules/auth/Login';
import RegisterForm from '@/modules/auth/Register';
import { BlogRoutes } from '@/modules/blogs';
import { CampaignRoutes } from '@/modules/crowdfunding';
import { DonationRoutes } from '@/modules/donations';
import Homepage from '@/modules/Homepage';
import { LeaderboardRoutes } from '@/modules/leaderboards';
import { QuestRoutes } from '@/modules/quests';
import { ScrapDealersRoutes } from '@/modules/scrap';
import { StoreRoutes } from '@/modules/store';
import { TutorialsRoutes } from '@/modules/tutorials';
import { VehiclesRoutes } from '@/modules/vehicle';
import { createBrowserRouter, Outlet } from 'react-router-dom';

const routes = [
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				index: true,
				element: <Homepage />
			},
			{
				path: '/Login',
				element: <LoginForm />
			},

			{
				path: '/register',
				element: <RegisterForm />
			},
			{
				path: '/blogs',
				element: <Outlet />,
				children: BlogRoutes // BlogRoutes,
			},
			{
				path: '/tutorials',
				element: <Outlet />,
				children: TutorialsRoutes // TutorialsRoutes,
			},
			{
				path: '/store',
				element: <Outlet />,
				children: StoreRoutes // StoreRoutes,
			},
			{
				path: '/campaigns',
				element: <Outlet />,
				children: CampaignRoutes // CampaignRoutes,
			},
			{
				path: '/vehicle',
				element: <Outlet />,
				children: VehiclesRoutes
			},
			{
				path: '/scraps',
				element: <Outlet />,
				children: ScrapDealersRoutes
			},
			{
				path: '/leaders',
				element: <Outlet />,
				children: LeaderboardRoutes
			},
			{
				path: '/donations',
				element: <Outlet />,
				children: DonationRoutes
			},
			{
				path: '/quests',
				element: <Outlet />,
				children: QuestRoutes
			}
		]
	}
];

export const router = createBrowserRouter(routes);
