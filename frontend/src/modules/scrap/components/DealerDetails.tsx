import { Link } from "react-router-dom";
import { DealerProps } from "./Dealer";
import { dealers } from "../pages/delaersData";

type Props = {
  dealer: DealerProps;
};

const DealerDetailsPage = ({ dealer = dealers[0]}: Props) => {
  return (
    <div className="font-openSans mb-4 max-w-3xl mx-auto bg-white  dark:bg-gray-900 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
      {/* Blog Image */}
      {dealer.image && (
        <img
          src={dealer.image}
          alt={dealer.name}
          className="w-full h-80 object-cover rounded-lg mb-6"
        />
      )}

      {/* Blog Title */}
      <h1 className="text-2xl font-roboto font-bold text-gray-800 dark:text-slate-50 mb-4">
        {dealer.name} - {dealer.location}
      </h1>

      {/* Tags */}
      <div className="flex flex-col flex-wrap mt-6">
        {dealer.prices.map((item, index) => (
          <p
            key={index}
            className="bg-white-100 mt-2 md:text-lg outline outline-1 outline-emerald-600 dark:bg-tranparent pl-2 dark:outline-emerald-200 text-gray-800 dark:text-emerald-200 py-1 rounded-full"
          >
            <span className="capitalize">{item.name}</span> - <span className="font-bold">Rs. {item.price}</span>
            
          </p>
        ))}
      </div>
      <div className="mt-4">
        <p>
          {dealer.description}
        </p>
      </div>

      {/* Navigation */}
      <div className="mt-8">
        <Link
          to="/scraps"
          className="text-emerald-600 dark:text-emerald-300 font-semibold hover:underline"
        >
          Contact Dealer
        </Link>
      </div>
    </div>
  );
};

export default DealerDetailsPage;
