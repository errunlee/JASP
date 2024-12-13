import { RouteObject } from 'react-router-dom';

import AllBlogs from './pages/AllBlogs';
import CreateBlog from './pages/CreateBlog';
import BlogDetailsPage from './components/BlogDetails';

export const BlogRoutes: RouteObject[] = [
	{
		path: '',
		element: <AllBlogs />
	},
	{ path: 'blog/:blogId', element: <BlogDetailsPage blog={{
		id: 0,
		authorId: 0,
		title: '',
		description: '',
		content: '',
		tags: [],
		createdAt: '',
		modifiedAt: '',
		createdBy: '',
		modifiedBy: '',
		image: undefined
	}} /> },
	{
		path: 'create',
		element: <CreateBlog />
	}
];
