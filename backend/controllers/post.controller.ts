import { Request, Response } from 'express';
import {
	getAllPosts,
	getPostById,
	createPost,
	deletePost,
	updatePost
} from '../services/post.service';
import { sendError } from '../utils/GenericErrorResponse';
import { sendResponse } from '../utils/GenericResponse';

// Get all posts with pagination
export const getAll = async (req: Request, res: Response) => {
	try {
		const { page = 1, limit = 10 } = req.query;

		// Ensure page and limit are numbers
		const pageNumber = parseInt(page as string, 10);
		const limitNumber = parseInt(limit as string, 10);

		// Validate pagination inputs
		if (
			isNaN(pageNumber) ||
			isNaN(limitNumber) ||
			pageNumber <= 0 ||
			limitNumber <= 0
		) {
			return sendError(res, {
				code: 400,
				message: 'Invalid pagination inputs'
			});
		}

		const posts = await getAllPosts({ page: pageNumber, limit: limitNumber });
		return sendResponse(res, {
			code: 200,
			message: 'Posts retrieved successfully',
			data: posts
		});
	} catch (error: any) {
		return sendError(res, {
			code: 500,
			message: 'Internal server error',
			description: error.message
		});
	}
};

// Get a post by ID
export const getById = async (req: Request, res: Response) => {
	try {
		const postId = parseInt(req.params.id, 10);

		if (isNaN(postId)) {
			return sendError(res, {
				code: 400,
				message: 'Invalid post ID'
			});
		}

		const post = await getPostById(postId);
		if (post) {
			return sendResponse(res, {
				code: 200,
				message: 'Post retrieved successfully',
				data: post
			});
		} else {
			return sendError(res, {
				code: 404,
				message: 'Post not found'
			});
		}
	} catch (error: any) {
		return sendError(res, {
			code: 500,
			message: 'Internal server error',
			description: error.message
		});
	}
};

// Create a new post
export const create = async (req: Request, res: Response) => {
	try {
		const { authorId, title, content, description, tags } = req.body;
		const file = req.file as Express.Multer.File;
		console.log(req.file);
		console.log(req.body);
		const newPost = await createPost({
			authorId,
			title,
			content,
			description,
			tags,
			image: file.path
		});
		return sendResponse(res, {
			code: 200,
			message: 'Post created successfully',
			data: newPost
		});
	} catch (error: any) {
		return sendError(res, {
			code: 500,
			message: 'Internal server error',
			description: error.message
		});
	}
};

// Update a post by ID
export const update = async (req: Request, res: Response) => {
	try {
		const postId = parseInt(req.params.id, 10);

		if (isNaN(postId)) {
			return sendError(res, {
				code: 400,
				message: 'Invalid post ID'
			});
		}

		const updatedPost = await updatePost(postId, req.body);
		if (updatedPost) {
			return sendResponse(res, {
				code: 200,
				message: 'Post updated successfully',
				data: updatedPost
			});
		} else {
			return sendError(res, {
				code: 404,
				message: 'Post not found'
			});
		}
	} catch (error: any) {
		return sendError(res, {
			code: 500,
			message: 'Internal server error',
			description: error.message
		});
	}
};

// Delete a post by ID
export const deleteById = async (req: Request, res: Response) => {
	try {
		const postId = parseInt(req.params.id, 10);

		if (isNaN(postId)) {
			return sendError(res, {
				code: 400,
				message: 'Invalid post ID'
			});
		}

		const deletedPost = await deletePost(postId);
		if (deletedPost) {
			return sendResponse(res, {
				code: 200,
				message: 'Post deleted successfully',
				data: deletedPost
			});
		} else {
			return sendError(res, {
				code: 404,
				message: 'Post not found'
			});
		}
	} catch (error: any) {
		return sendError(res, {
			code: 500,
			message: 'Internal server error',
			description: error.message
		});
	}
};
