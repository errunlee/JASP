import { PrismaClient, type Request } from '@prisma/client';
import { PaginationParams } from '../interfaces/pagination-params.interface';

const prisma = new PrismaClient();

export async function getAllRequest({
	page,
	limit
}: PaginationParams): Promise<Request[]> {
	const offset = (page - 1) * limit;
	const requests = await prisma.request.findMany({
		skip: offset,
		take: limit
	});
	return requests;
}

export async function getRequestById(
	requestId: number
): Promise<Request | null> {
	const request = await prisma.request.findUnique({
		where: { id: requestId }
	});
	return request;
}

export async function createRequest(requestData: Request): Promise<Request> {
	const newRequest = await prisma.request.create({
		data: {
			title: requestData.title,
			requesterId: requestData.requesterId,
			description: requestData.description,
			goal: requestData.goal,
			date: requestData.date,
			duration: requestData.duration,
			location: requestData.location,
			totalAmount: requestData.totalAmount | 0
		}
	});
	return newRequest;
}

export async function updateRequest(
	requestId: number,
	requestData: Partial<Request>
): Promise<Request | null> {
	const updatedRequest = await prisma.request.update({
		where: { id: requestId },
		data: {
			title: requestData.title,
			requesterId: requestData.requesterId,
			description: requestData.description,
			goal: requestData.goal,
			date: requestData.date,
			duration: requestData.duration,
			location: requestData.location,
			totalAmount: requestData.totalAmount
		}
	});
	return updatedRequest;
}
