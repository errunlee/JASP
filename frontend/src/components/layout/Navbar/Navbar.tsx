import { useRef, useState } from 'react';
import ThemeToggle from './ThemeToggle';
import { NavLink, useLocation } from 'react-router-dom';
import ProfileDropdown from './ProfileDropdown';

const Navbar = () => {
	const ref = useRef<HTMLDivElement>(null);
	const location = useLocation();

	// Determine text color based on route
	const textColor = location.pathname === '/' ? 'text-white' : 'text-black';

	const [isMobileNavOpen, setMobileNavOpen] = useState(false);

	const navLinks = [
		{
			name: 'Home',
			to: '/'
		},
		{
			name: 'About',
			to: '/about'
		},
		{
			name: 'Blogs',
			to: '/blogs'
		},
		{
			name: 'Campaigns',
			to: '/campaigns'
		}
	];

	const handleMobileNav = () => {
		setMobileNavOpen((prev) => !prev);
	};

	const isHomepage = location.pathname === '/';

	return (
		<header
			className={` text-primary fixed top-0  left-0 right-0 z-20 ${
				isHomepage ? 'bg-transparent' : 'bg-secondary text-black'
			}`}
		>
			<nav className="container mx-auto flex justify-between items-center p-4">
				{/* Logo Section */}
				<div className="flex items-center space-x-2">
					<div className="h-8 w-8  bg-secondary  rounded-full flex items-center justify-center text-xl font-bold">
						L
					</div>
					<span
						className={`text-xl  font-semibold tracking-wider ${textColor}`}
					>
						Trashformers
					</span>
				</div>

				<section className="flex gap-7">
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
								? 'translate-x-0 opacity-100'
								: 'translate-x-full opacity-0 md:translate-x-0 md:opacity-100'
						}
            flex flex-col md:flex-row
            justify-center md:justify-between
            items-center space-y-8 md:space-y-0
            p-8 md:p-0
            z-30 md:z-0
            ${
							isHomepage
								? 'md:text-white'
								: 'text-white md:text-black dark:md:text-white'
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
                ${isActive ? 'border-primary border-b-2' : ''}
              `}
							>
								{name}
							</NavLink>
						))}
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
							className="md:hidden focus:outline-none hover:text-gray-600 z-40 relative text-black"
						>
							{isMobileNavOpen ? (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth="1.5"
									stroke="currentColor"
									className="w-6 h-6 animate-spin-slow"
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
									strokeWidth="1.5"
									stroke="currentColor"
									className="w-6 h-6"
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
