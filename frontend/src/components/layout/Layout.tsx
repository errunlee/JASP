import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";

type Props = {};

const Layout = ({}: Props) => {
  return (
    <>
      <Navbar />
      <div className="mt-20 bg-background text-foreground min-h-screen">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
