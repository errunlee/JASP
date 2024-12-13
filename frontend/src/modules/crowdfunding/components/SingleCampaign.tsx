import { Link } from "react-router-dom";

type Props = {
  campaign: {
    id: number;
    title: string;
    description: string;
    author: string;
    date: string;
    image: string;
  };
};

const SingleCampaign = ({ campaign }: Props) => {
  return (
    <div
      key={campaign.id}
      className="bg-white dark:bg-gray-900 border-1 dark:border-2 border-emerald-700 dark:border-emerald-600 rounded-lg shadow-sm shadow-emerald-700 overflow-hidden"
    >
      <div className="p-2 rounded-sm">
        <img
          src={campaign.image}
          alt={campaign.title}
          className="rounded-md w-full h-48 object-cover"
        />
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold font-openSans text-gray-800 dark:text-slate-50">
          {campaign.title}
        </h2>
        <p className="font-parkinsans text-sm text-gray-600 dark:text-slate-100 mt-2">
          {campaign.description}
        </p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-sm text-gray-500 dark:text-slate-50">
            By {campaign.author} on {campaign.date}
          </span>
          <Link
            to="./campaign/1"
            className="text-sm text-green-600 dark:text-emerald-300 font-semibold hover:underline"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingleCampaign;
