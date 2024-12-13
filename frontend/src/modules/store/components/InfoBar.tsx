import { ShoppingBag, Store } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useShoppingCart } from "../context/useShoppingCart";
import { Button } from "@/components/ui/button";
export default function InfoBar() {
  const { openCart, cartQuantity } = useShoppingCart();

  return (
    <nav className="flex w-full items-center ">
      <ul className="flex gap-10 mr-auto items-baseline">
        <li className="">
          <NavLink
            aria-current="page"
            to={"/store"}
            className={"flex gap-2 bg-emerald-800 text-white rounded-md p-3"}
          >
            <Store /> Store
          </NavLink>
        </li>
      </ul>

      <Button
        variant={"outline"}
        size={"lg"}
        onClick={openCart}
        className="rounded-full z-10 pointer-events-none p-3 text-sky-600 bg-transparent outline outline-2 relative dark:text-slate-50"
        title="your cart"
      >
        <ShoppingBag />
        <div className="rounded-full px-1.5 absolute bottom-0 right-0 translate-y-1/4 translate-x-1/4 flex justify-center items-center bg-red-600 text-white">
          {cartQuantity}
        </div>
      </Button>
    </nav>
  );
}
