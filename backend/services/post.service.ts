import { PrismaClient, type Post } from '@prisma/client'
import { PaginationParams } from '../interfaces/pagination-params.interface'
import { logger, LogType } from '../utils/logger'

const prisma = new PrismaClient()

async function verifyUser (authorId: number) {
  const author = await prisma.user.findUnique({
    where: {
      id: authorId
    }
  })
  if (!author) {
    const genMessage = `Author with id ${authorId} Not Found`
    logger(LogType.ERROR, genMessage)
    throw new Error(genMessage)
  }
}

// Get all posts with pagination
export async function getAllPosts ({
  page,
  limit
}: PaginationParams): Promise<Post[]> {
  const offset = (page - 1) * limit
  const posts = await prisma.post.findMany({
    skip: offset,
    take: limit
  })
  return posts
}

// Get post by ID
export async function getPostById (postId: number): Promise<Post | null> {
  const post = await prisma.post.findUnique({
    where: { id: postId }
  })
  return post
}

// Create a new post
export async function createPost (
  postData: any,
  file: Express.Multer.File
): Promise<Post> {
  try {
    let authorId =
      typeof postData.authorId == 'number'
        ? postData.authorId
        : parseInt(postData.authorId, 10)
    logger(LogType.INFO, file.path.replace('\\', '/'))
    const tags = postData.tags.split(',')

    verifyUser(authorId)

    const newPost = await prisma.post.create({
      data: {
        authorId,
        title: postData.title,
        content: postData.content,
        description: postData.description,
        tags,
        image: file.path.replace('\\', '/')
      }
    })
    return newPost
  } catch (error) {
    logger(
      LogType.ERROR,
      error instanceof Error
        ? error.message
        : typeof error == 'string'
        ? error
        : 'Undefined Error'
    )
    throw error
  }
}

// Update a post by ID
export async function updatePost (
  postId: number,
  postData: Partial<Post>
): Promise<Post | null> {
  try {
    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        authorId: postData.authorId,
        title: postData.title,
        content: postData.content,
        description: postData.description,
        tags: postData.tags
      }
    })
    return updatedPost
  } catch (error) {
    logger(
      LogType.ERROR,
      error instanceof Error
        ? error.message
        : typeof error == 'string'
        ? error
        : 'Undefined Error'
    )
    throw error
  }
}

// Delete a post by ID
export async function deletePost (postId: number): Promise<Post | null> {
  const deletedPost = await prisma.post.delete({
    where: { id: postId }
  })
  return deletedPost
}
