import { PrismaClient, Prisma } from '@prisma/client'

export class NotificationService {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  // Create a new notification
  async createNotification(data: Prisma.NotificationCreateInput) {
    try {
      return await this.prisma.notification.create({ data })
    } catch (error:any) {
      throw new Error(`Failed to create notification: ${error.message}`)
    }
  }

  // Get all notifications with pagination
  async getAllNotifications(params: {
    page?: number
    pageSize?: number
    orderBy?: Prisma.NotificationOrderByWithRelationInput
    where?: Prisma.NotificationWhereInput
  }) {
    const { 
      page = 1, 
      pageSize = 10, 
      orderBy = { sentDate: 'desc' },
      where = {} 
    } = params

    try {
      const totalCount = await this.prisma.notification.count({ where })
      const notifications = await this.prisma.notification.findMany({
        where: {
          ...where,
          isDeleted: false
        },
        orderBy,
        skip: (page - 1) * pageSize,
        take: pageSize
      })

      return {
        notifications,
        pagination: {
          currentPage: page,
          pageSize,
          totalCount,
          totalPages: Math.ceil(totalCount / pageSize)
        }
      }
    } catch (error:any) {
      throw new Error(`Failed to retrieve notifications: ${error.message}`)
    }
  }

  // Get notification by ID
  async getNotificationById(id: number) {
    try {
      const notification = await this.prisma.notification.findUnique({
        where: { 
          id,
          isDeleted: false 
        }
      })

      if (!notification) {
        throw new Error('Notification not found')
      }

      return notification
    } catch (error:any) {
      throw new Error(`Failed to retrieve notification: ${error.message}`)
    }
  }

  // Update a notification
  async updateNotification(
    id: number, 
    data: Prisma.NotificationUpdateInput
  ) {
    try {
      return await this.prisma.notification.update({
        where: { 
          id,
          isDeleted: false 
        },
        data
      })
    } catch (error:any) {
      throw new Error(`Failed to update notification: ${error.message}`)
    }
  }

  // Soft delete a notification (mark as deleted)
  async deleteNotification(id: number) {
    try {
      return await this.prisma.notification.update({
        where: { id },
        data: { isDeleted: true }
      })
    } catch (error:any) {
      throw new Error(`Failed to delete notification: ${error.message}`)
    }
  }

  // Optional: Hard delete (permanently remove) - use with caution
  async hardDeleteNotification(id: number) {
    try {
      return await this.prisma.notification.delete({
        where: { id }
      })
    } catch (error:any) {
      throw new Error(`Failed to permanently delete notification: ${error.message}`)
    }
  }
}