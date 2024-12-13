import Spinner from "./Spinner";

// import Loader from "@/assets/images/loading-6321_512.gif";
type Props = {};

const Overlay = ({}: Props) => {
  return (
    <div className="fixed z-10 top-0 left-0 bg-black bg-opacity-60 w-screen h-screen">
      <div className="w-full h-full flex justify-center items-center">
        <Spinner />
      </div>
    </div>
  );
};

export default Overlay;
