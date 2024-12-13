import SingleBlog from "../components/SingleBlog";
import { blogs } from "./tempBlogs";

const BlogList = () => {
  return (
    <div className="min-h-screen  dark:bg-gray-900 py-8 md:px-10 px-5 ">
      <h1 className="text-3xl font-roboto tracking-wider font-bold text-center mb-6 text-emerald-600 dark:text-emerald-400">
        Featured Blogs
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {blogs.map((blog) => (
          <SingleBlog key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default BlogList;
