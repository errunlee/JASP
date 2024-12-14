const BlogSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse p-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-200 dark:bg-gray-800"
        >
          <div className="h-48 mb-4 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
          <div className="h-6 mb-2 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
          <div className="h-4 w-1/2 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
        </div>
      ))}
    </div>
  );
};

export default BlogSkeleton;
