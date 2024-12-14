import { baseURL } from "@/lib/instance";
import { Link } from "react-router-dom";

export type BlogResponse = {
  id?: number;
  authorId?: number;
  title?: string;
  description?: string;
  content?: string;
  tags?: string[];
  createdAt?: string;
  modifiedAt?: string;
  createdBy?: string;
  modifiedBy?: string;
  image?: string;
};

type Props = {
  blog: BlogResponse;
};

const SingleBlog = ({ blog }: Props) => {
  return (
    <div
      key={blog?.id}
      className="bg-white dark:bg-gray-900 border border-emerald-700 dark:border-emerald-600 rounded-lg shadow-md shadow-emerald-700 overflow-hidden"
    >
      {/* Blog Image */}
      {blog?.image && (
        <img
          src={baseURL + "/" + blog?.image}
          alt={blog?.title}
          className="w-full h-48 object-cover"
        />
      )}

      {/* Blog Title */}
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-slate-50">
          {blog?.title}
        </h2>

        {/* Blog Content Preview */}
        <div className="mt-4">
          <p className="text-sm text-gray-700 dark:text-slate-200 truncate">
            {blog?.content?.substring(0, 150)}...
          </p>
        </div>

        {/* Meta Information */}
        <div className="flex items-center justify-between mt-4">
          <span className="text-sm text-gray-500 dark:text-slate-50">
            By {blog?.createdBy} on{" "}
            {blog?.createdAt
              ? new Date(blog?.createdAt).toLocaleDateString()
              : ""}
          </span>
          <Link
            to={`./blog/${blog?.id}`}
            className="text-sm text-green-600 dark:text-emerald-300 font-semibold hover:underline"
          >
            Read More
          </Link>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 mt-4">
          {blog?.tags?.map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-emerald-100 dark:bg-emerald-700 text-emerald-600 dark:text-emerald-200 px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
