import Video from "../components/Video";
import allTutorials from "../data/tutorials.json";

const Tutorials = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4 md:px-6 lg:px-10">
      <h1 className="text-3xl font-roboto tracking-wider font-bold text-center mb-6 text-emerald-600 dark:text-emerald-400">
        Featured Tutorials
      </h1>
      <div className="grid lg:grid-cols-3 gap-6 px-4 mx-auto">
        {allTutorials.map((video) => (
          <Video key={video.id} {...video} />
        ))}
      </div>
    </div>
  );
};

export default Tutorials;
