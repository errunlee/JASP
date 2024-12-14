import { PrismaClient, type Post } from '@prisma/client';
import { PaginationParams } from '../interfaces/pagination-params.interface';

const prisma = new PrismaClient();

// Get all posts with pagination
export async function getAllPosts({
	page,
	limit
}: PaginationParams): Promise<Post[]> {
	const offset = (page - 1) * limit;
	const posts = await prisma.post.findMany({
		skip: offset,
		take: limit
	});
	return posts;
}

// Get post by ID
export async function getPostById(postId: number): Promise<Post | null> {
	const post = await prisma.post.findUnique({
		where: { id: postId }
	});
	return post;
}

// Create a new post
export async function createPost(postData :any, file:Express.Multer.File): Promise<Post> {
	let authorId = typeof postData.authorId=="number"?postData.authorId:parseInt(postData.authorId,10);

	const tags = postData.tags.split(",");
	const newPost = await prisma.post.create({
		data: {
			authorId,
			title: postData.title,
			content: postData.content,
			description: postData.description,
			tags,
			image: file.path
		}
	});
	return newPost;
}

// Update a post by ID
export async function updatePost(
	postId: number,
	postData: Partial<Post>
): Promise<Post | null> {
	const updatedPost = await prisma.post.update({
		where: { id: postId },
		data: {
			authorId: postData.authorId,
			title: postData.title,
			content: postData.content,
			description: postData.description,
			tags: postData.tags
		}
	});
	return updatedPost;
}

// Delete a post by ID
export async function deletePost(postId: number): Promise<Post | null> {
	const deletedPost = await prisma.post.delete({
		where: { id: postId }
	});
	return deletedPost;
}
