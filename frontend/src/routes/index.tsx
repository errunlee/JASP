<<<<<<< HEAD
import Layout from '@/components/layout/Layout';
import { BlogRoutes } from '@/modules/blogs';
import Homepage from '@/modules/Homepage';
=======
import Layout from "@/components/layout/Layout";
import { BlogRoutes } from "@/modules/blogs";
import Homepage from "@/modules/Homepage";
>>>>>>> 9bde3f86b6c8ff428ce3fa27f3d525143ae57c00
// import LoginForm from "@/modules/auth/Login";
// import RegisterForm from "@/modules/auth/Register";
// import { BlogRoutes } from "@/modules/blogs";
// import { CampaignRoutes } from "@/modules/crowdfunding";
// import Homepage from "@/modules/pages/Homepage";
// import { StoreRoutes } from "@/modules/store";
// import { TutorialsRoutes } from "@/modules/tutorials";
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
				path: '/about',
				element: <p>about</p>
			},
			{
				path: '/Login',
				element: <p>Login</p>
			},

      {
        path: "/register",
        element: <p>register</p>,
      },
      {
        path: "/blogs",
        element: <Outlet />,
        children: BlogRoutes, // BlogRoutes,
      },
      {
        path: "/tutorials",
        element: <Outlet />,
        children: [], // TutorialsRoutes,
      },
      {
        path: "/store",
        element: <Outlet />,
        children: [], // StoreRoutes,
      },
      {
        path: "/campaigns",
        element: <Outlet />,
        children: [], // CampaignRoutes,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);