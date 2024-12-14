import { api } from '@/lib/instance';
import { toast } from '@/lib/toast';
import { AxiosError } from 'axios';

enum ProductCategory {
	ELECTRONICS,
	FURNITURE,
	VEHICLES,
	MACHINERY,
	MISCELLANEOUS
}

export interface IDonation {
	donatorId: string;
	name: string;
	file: File;
	details: string;
	location: string;
	category: ProductCategory;
}

export const postDonation = async (data: FormData) => {
	try {
		await api.post<IDonation>('/api/donations', data);
		toast.success('Donation posted successfully!');
	} catch (err) {
		if (err instanceof AxiosError) {
			toast.error(err.response?.data.message);
		} else {
			toast.error('Failed to post donation');
		}
	}
};
export const usePostDonation = (data: FormData) => {
	return postDonation(data);
};
