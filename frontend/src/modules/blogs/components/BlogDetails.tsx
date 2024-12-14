import { Link, useParams } from "react-router-dom";
// import { tempBlogs as blogs } from "../pages/tempBlogs";
import { api, baseURL } from "@/lib/instance";
// import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { BlogResponse } from "./SingleBlog";
import BlogSkeleton from "./BlogDetailLoader";

// type Blog = {
//   id: number;
//   authorId: number;
//   title: string;
//   description: string;
//   content: string;
//   tags: string[];
//   createdAt: string;
//   modifiedAt: string;
//   createdBy: string;
//   modifiedBy: string;
//   image?: string;
// };

const BlogDetailsPage = () => {
  const { blogId } = useParams();

  const getBlogById = async () => {
    const res = await api.get(`/api/blog/${blogId}`);
    return res.data.data;
  };

  const { data: blog, isLoading } = useQuery<BlogResponse>({
    queryKey: ["blog", blogId],
    queryFn: getBlogById,
  });

  if (isLoading) {
    return <BlogSkeleton />;
  }

  return (
    <div className="font-openSans max-w-3xl mx-auto bg-white  dark:bg-gray-900 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
      {/* Blog Image */}
      {blog?.image && (
        <img
          src={`${baseURL}/${blog?.image}`}
          alt={blog.title}
          className="w-full h-80 object-cover rounded-lg mb-6"
        />
      )}

      {/* Blog Title */}
      <h1 className="text-2xl font-roboto font-bold text-gray-800 dark:text-slate-50 mb-4">
        {blog?.title}
      </h1>

      {/* Author and Date */}
      <div className="text-sm text-gray-600 dark:text-slate-300 mb-6">
        <p>
          By <span className="font-semibold">{blog?.createdBy}</span> on{" "}
          {blog?.createdAt}
        </p>
        <p>Last modified: {blog?.modifiedAt}</p>
      </div>

      {/* Blog Content */}
      <div className="prose dark:prose-invert max-w-none">
        <article dangerouslySetInnerHTML={{ __html: blog?.content || "N/A" }} />
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-6">
        {blog?.tags?.map((tag: any, index: number) => (
          <span
            key={index}
            className="bg-emerald-100 dark:bg-emerald-700 text-emerald-600 dark:text-emerald-200 text-xs px-2 py-1 rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Navigation */}
      <div className="mt-8">
        <Link
          to="/blogs"
          className="text-emerald-600 dark:text-emerald-300 font-semibold hover:underline"
        >
          Back to Blogs
        </Link>
      </div>
    </div>
  );
};

export default BlogDetailsPage;
