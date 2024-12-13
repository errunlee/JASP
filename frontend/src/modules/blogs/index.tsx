import { RouteObject } from 'react-router-dom';

import AllBlogs from './pages/AllBlogs';
import CreateBlog from './pages/CreateBlog';
import BlogDetailsPage from './components/BlogDetails';

export const BlogRoutes: RouteObject[] = [
	{
		path: '',
		element: <AllBlogs />
	},
	{ path: 'blog/:blogId', element: <BlogDetailsPage /> },
	{
		path: 'create',
		element: <CreateBlog />
	}
];
