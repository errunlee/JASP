import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createUser, findUserByEmail } from '../services/user.service';
import { sendError } from '../utils/GenericErrorResponse';
import { sendResponse } from '../utils/GenericResponse';

export const register = async (req: Request, res: Response) => {
	try {
		const { username, email, password, confirmPassword } = req.body;

		if (confirmPassword != password) {
			sendError(res, {
				code: 400,
				message: 'Confirm Password and Password are not same'
			});
			return;
		}
		const hashedPassword = await bcrypt.hash(
			password,
			parseInt(process.env.BCRYPT_SALT_ROUNDS!)
		);

		const user = await createUser({
			username,
			email,
			password: hashedPassword,
		});

		sendResponse(res, {
			code: 201,
			message: 'User create Successfully',
			data: user
		});
	} catch (error) {
		if (error instanceof Error) {
			sendError(res, {
				code: 500,
				message: 'Internal server error',
				description: error.message
			});
		}
	}
};

export const login: any = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;

		const user = await findUserByEmail(email);

		if (!user) {
			return sendError(res, {
				code: 400,
				message: 'Invalid email or password'
			});
		}

		const isPassowrdValid = await bcrypt.compare(password, user.password);
		if (!isPassowrdValid) {
			return sendError(res, {
				code: 400,
				message: 'Invalid email or password'
			});
		}

		const token = jwt.sign(
			{ id: user.id, email: user.email },
			process.env.JWT_SECRET!,
			{
				expiresIn: process.env.JWT_EXPIRATION
			}
		);

		sendResponse(res, {
			message: 'Login successful',
			data: {
				token,
				user: {
					id: user.id,
					username: user.username,
					role: user.roles
				}
			}
		});
	} catch (error) {
		if (error instanceof Error) {
			sendError(res, {
				code: 500,
				message: 'Internal server error',
				description: error.message
			});
		}
	}
};
