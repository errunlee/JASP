import {
  PrismaClient,
  type Request,
  type UserCampaign,
  type FundingParticipant,
  type User
} from '@prisma/client'
import { PaginationParams } from '../interfaces/pagination-params.interface'
import { logError } from '../utils/GenericErrorResponse'
import { logger, LogType } from '../utils/logger'

const prisma = new PrismaClient()

export async function getAllRequest ({
  page,
  limit
}: PaginationParams): Promise<Request[]> {
  const offset = (page - 1) * limit
  const requests = await prisma.request.findMany({
    skip: offset,
    take: limit
  })
  return requests
}

export async function getRequestById (
  requestId: number
): Promise<Request | null> {
  const request = await prisma.request.findUnique({
    where: { id: requestId }
  })
  return request
}

export async function createRequest (requestData: Request): Promise<Request> {
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
  })
  return newRequest
}

export async function updateRequest (
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
  })
  return updatedRequest
}

export async function joinCampaign (
  userId: number,
  requestId: number
): Promise<UserCampaign | null> {
  const joinRequest = await prisma.usercampaign.create({
    data: {
      userId,
      requestId
    }
  })

  return joinRequest
}

export async function fundCampaign (
  fundingParticipant: Partial<FundingParticipant>
): Promise<FundingParticipant | null> {
  const fp = await prisma.fundingparticipant.create({
    data: {
      ...fundingParticipant
    }
  })

  return fp
}

async function requestExist (id: number): Promise<boolean> {
  const request = await prisma.request.findUnique({
    where: {
      id
    }
  })

  if (!request) {
    logger(LogType.ERROR, `Request with ${id} Not found`)
    return false
  }
  return true
}

export async function getFundingParticipant (
  requestId: number
): Promise<User[]> {
  try {
    if (!(await requestExist(requestId))) {
		throw new Error("Request with given Id Not Found");
	}
    const fp = await prisma.fundingparticipant.findMany({
      where: {
        requestId
      }
    })
    if (fp) {
      return fp.map((val: FundingParticipant) => val.user)
    }
  } catch (err) {
    logError(err)
  }
  return []
}

export async function getCampaignUsers (requestId: number): Promise<User[]> {
    if (!(await requestExist(requestId))) {
		throw new Error("Request with given Id Not Found");
	}

  const uc = await prisma.usercampaign.findMany({
    where: {
      requestId
    }
  })
  if (uc) {
    return uc.map((val: UserCampaign) => val.user)
  }
  return []
}

export async function getAllParticipants (
  requestId: number
): Promise<User[] | null> {
  try {
    if (!(await requestExist(requestId))) {
		throw new Error("Request with given Id Not Found");
	}
    const fps = await getFundingParticipant(requestId)
    const cus = await getCampaignUsers(requestId)

    return [...fps, ...cus]
  } catch (err) {
    logError(err)
    throw err
  }
}
