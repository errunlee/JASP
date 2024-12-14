const BlogSkeleton = () => {
  return (
    <div className="font-openSans max-w-3xl mx-auto bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 animate-pulse">
      {/* Blog Image */}
      <div className="bg-gray-300 dark:bg-gray-700 h-80 rounded-lg mb-6"></div>

      {/* Blog Title */}
      <div className="bg-gray-300 dark:bg-gray-700 w-2/3 h-8 rounded mb-4"></div>

      {/* Author and Date */}
      <div className="bg-gray-300 dark:bg-gray-700 w-1/2 h-4 rounded mb-6"></div>
      <div className="bg-gray-300 dark:bg-gray-700 w-1/3 h-4 rounded mb-6"></div>

      {/* Blog Content */}
      <div className="bg-gray-300 dark:bg-gray-700 w-full h-6 rounded mb-4"></div>
      <div className="bg-gray-300 dark:bg-gray-700 w-3/4 h-6 rounded mb-4"></div>
      <div className="bg-gray-300 dark:bg-gray-700 w-1/2 h-6 rounded mb-4"></div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-6">
        <div className="bg-gray-300 dark:bg-gray-700 w-20 h-6 rounded"></div>
        <div className="bg-gray-300 dark:bg-gray-700 w-20 h-6 rounded"></div>
      </div>

      {/* Navigation */}
      <div className="mt-8 bg-gray-300 dark:bg-gray-700 w-40 h-6 rounded"></div>
    </div>
  );
};
export default BlogSkeleton;
