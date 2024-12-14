import { api } from '@/lib/instance';

const endPoint = '/api/donations/?limit=50';

export const getAllDonations = async () => {
	try {
		const response = await api.get(endPoint);
		return response.data.data;
	} catch {
		return [];
	}
};
