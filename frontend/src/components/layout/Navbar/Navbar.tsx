import { useEffect, useRef, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { NavLink, useLocation } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

const Navbar = () => {
  const ref = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const [hasBackground, setHasBackground] = useState(false);
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  const navLinks = [
    {
      name: "Live Vehicle",
      to: "/vehicle",
    },
  ];

  const handleMobileNav = () => {
    setMobileNavOpen((prev) => !prev);
  };

  const isHomepage = location.pathname === "/";

  // Intersection Observer to track scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight) {
        setHasBackground(true);
      } else {
        setHasBackground(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`text-primary fixed top-0 left-0 right-0 z-[300] transition-colors duration-300 ${
        isHomepage && !hasBackground
          ? "bg-transparent"
          : "bg-secondary text-black"
      }`}
    >
      <nav className="container mx-auto flex justify-between items-center gap-4 p-4">
        {/* Logo Section */}
        <NavLink
          to={"/"}
          className={`flex items-center space-x-2 ${
            isHomepage && !hasBackground
              ? "text-white"
              : "text-black dark:text-white"
          }`}
        >
          <div className="h-8 w-8 bg-secondary rounded-full outline outline-2 outline-green-800 dark:outline-slate-100 justify-center">
            <img
              src="/green_leaves_round_logo.jpg"
              alt="logo"
              className="w-8 h-8 rounded-full brightness-[90%]"
            />
          </div>
          <span className={`text-xl font-semibold tracking-wider`}>
            Trashformers
          </span>
        </NavLink>

        <section className="flex gap-4">
          {/* Navigation Links */}
          <div
            ref={ref}
            className={`
            fixed inset-0 bg-primary md:bg-transparent 
            md:static 
            md:flex md:space-x-8 
            transform transition-all duration-100 ease-in-out
            ${
              isMobileNavOpen
                ? "translate-x-0 opacity-100"
                : "translate-x-full opacity-0 md:translate-x-0 md:opacity-100"
            }
            flex flex-col md:flex-row
            justify-center md:justify-between
            items-center space-y-8 md:space-y-0
            p-8 md:p-0
            z-30 md:z-0 text-white
            ${
              isHomepage && !hasBackground
                ? "md:text-white"
                : "text-white md:text-black dark:md:text-white"
            }
          `}
          >
            {navLinks.map(({ name, to }) => (
              <NavLink
                key={to}
                onClick={handleMobileNav}
                to={to}
                className={({ isActive }) => `
                text-2xl md:text-lg 
                hover:text-gray-500 
																dark:hover:text-emerald-300
																hover:border-b-2 hover:border-gray-700 dark:hover:border-slate-100
                transition duration-300 
                ${isActive ? "border-primary border-b-2" : ""}
              `}
              >
                {name}
              </NavLink>
            ))}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex justify-center items-center text-2xl md:text-lg hover:text-gray-500 dark:hover:text-emerald-300 hover:border-b-2 hover:border-gray-700 dark:hover:border-slate-100 transition duration-300">
                  Community <ChevronDown size={20} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white dark:bg-gray-800 text-black dark:text-white">
                <DropdownMenuItem
                  asChild
                  onMouseEnter={() => {
                    // Trigger the dropdown menu on hover for laptop and desktops
                    const event = new MouseEvent("click", {
                      view: window,
                      bubbles: true,
                      cancelable: true,
                    });
                    document
                      .querySelector('[data-state="open"]')
                      ?.dispatchEvent(event);
                  }}
                >
                  <NavLink
                    to="/campaigns"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  >
                    Campaigns
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <NavLink
                    to="/leaderboard"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  >
                    LeaderBoards
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <NavLink
                    to="/donations"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  >
                    Donations
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <NavLink
                    to="/quests"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  >
                    Quests
                  </NavLink>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex justify-center items-center text-2xl md:text-lg hover:text-gray-500 dark:hover:text-emerald-300 hover:border-b-2 hover:border-gray-700 dark:hover:border-slate-100 transition duration-300">
                  Market <ChevronDown size={20} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white dark:bg-gray-800 text-black dark:text-white">
                <DropdownMenuItem
                  asChild
                  onMouseEnter={() => {
                    // Trigger the dropdown menu on hover for laptop and desktops
                    const event = new MouseEvent("click", {
                      view: window,
                      bubbles: true,
                      cancelable: true,
                    });
                    document
                      .querySelector('[data-state="open"]')
                      ?.dispatchEvent(event);
                  }}
                >
                  <NavLink
                    to="/store"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  >
                    Store
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <NavLink
                    to="/scraps"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  >
                    Scraps
                  </NavLink>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex justify-center items-center text-2xl md:text-lg hover:text-gray-500 dark:hover:text-emerald-300 hover:border-b-2 hover:border-gray-700 dark:hover:border-slate-100 transition duration-300">
                  Learn <ChevronDown size={20} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white dark:bg-gray-800 text-black dark:text-white">
                <DropdownMenuItem
                  asChild
                  onMouseEnter={() => {
                    // Trigger the dropdown menu on hover for laptop and desktops
                    const event = new MouseEvent("click", {
                      view: window,
                      bubbles: true,
                      cancelable: true,
                    });
                    document
                      .querySelector('[data-state="open"]')
                      ?.dispatchEvent(event);
                  }}
                >
                  <NavLink
                    to="/blogs"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  >
                    Blogs
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <NavLink
                    to="/tutorials"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  >
                    Tutorials
                  </NavLink>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Theme Toggle and Mobile Menu Button Container */}
          <div className="flex items-center space-x-4 ">
            {/* Theme Toggle */}
            <ThemeToggle />
            <ProfileDropdown />
            {/* Mobile Menu Button */}
            <button
              onClick={handleMobileNav}
              type="button"
              className="md:hidden focus:outline-none  hover:text-gray-800 dark:text-gray-100 z-40 relative text-black"
            >
              {isMobileNavOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-8 h-8 animate-spin-slow"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 5.25h16.5m-16.5 7.5h16.5m-16.5 7.5h16.5"
                  />
                </svg>
              )}
            </button>
          </div>
        </section>
      </nav>
    </header>
  );
};

export default Navbar;
