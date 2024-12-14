import BlogSkeleton from "../components/BlogsSkeleton";
import SingleBlog, { BlogResponse } from "../components/SingleBlog";
import { getAllBlogs } from "../hooks/useGetAllBlogs";
import { useQuery } from "@tanstack/react-query";

const BlogList = () => {
  const { data: blogs, isLoading } = useQuery<BlogResponse[]>({
    queryKey: ["blogs"],
    queryFn: getAllBlogs,
  });

  if (isLoading) return <BlogSkeleton />;
  return (
    <div className="min-h-screen  dark:bg-gray-900 py-8 md:px-10 px-5 ">
      <h1 className="text-3xl font-roboto tracking-wider font-bold text-center mb-6 text-emerald-600 dark:text-emerald-400">
        Featured Blogs
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {blogs instanceof Array &&
          blogs.map((blog, index) => <SingleBlog key={index} blog={blog} />)}
      </div>
    </div>
  );
};

export default BlogList;
