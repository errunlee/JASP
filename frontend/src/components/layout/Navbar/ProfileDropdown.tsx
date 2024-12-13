import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import VisuallyHidden from '@/components/ui/VisuallyHidden';
import { User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type Props = {};

// eslint-disable-next-line no-empty-pattern
const ProfileDropdown = ({}: Props) => {
	const navigate = useNavigate();

	const DropdownItems = {
		isLoggedIn: [
			{
				label: 'Create post',
				onclick: () => navigate('/blogs/create')
			},
			{
				label: 'Profile',
				onclick: () => {}
			},
			{
				label: 'Settings',
				onclick: () => {}
			},
			{
				label: 'LogOut',
				onclick: () => {}
			}
		],
		isLoggedOut: [
			{
				label: 'Login',
				onclick: () => {
					navigate('/login');
				}
			}
		]
	};

	const isLoggedIn = true;
	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger className="bg-gray-200 dark:bg-gray-800 border-2 border-gray-800 dark:border-gray-300 h-8 w-8 rounded-full border-primary flex justify-center items-center">
					<User className="text-gray-800 dark:text-white" />
					<VisuallyHidden>Open User Account Details</VisuallyHidden>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuLabel>My Account</DropdownMenuLabel>
					<DropdownMenuSeparator />
					{isLoggedIn
						? DropdownItems.isLoggedIn.map((item) => (
								<DropdownMenuItem key={item.label} onClick={item.onclick}>
									{item.label}
								</DropdownMenuItem>
						  ))
						: DropdownItems.isLoggedOut.map((item) => (
								<DropdownMenuItem key={item.label} onClick={item.onclick}>
									{item.label}
								</DropdownMenuItem>
						  ))}
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
};

export default ProfileDropdown;
