import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {
  createUser,
  deletePushToken,
  findUserByEmail,
  findUserById,
  updateUserData
} from '../services/user.service'
import { logError, sendError } from '../utils/GenericErrorResponse'
import { sendResponse } from '../utils/GenericResponse'
import { UserRole } from '@prisma/client'
import { logger, LogType } from '../utils/logger'

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password, confirmPassword, checkpointId, roles } =
      req.body

    if (confirmPassword != password) {
      sendError(res, {
        code: 400,
        message: 'Confirm Password and Password are not same'
      })
      return
    }
    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.BCRYPT_SALT_ROUNDS!)
    )

    const user = await createUser({
      username,
      email,
      password: hashedPassword,
      roles: [UserRole.REGULAR_USER, ...(roles ?? [])],
      checkpointId: parseInt(checkpointId, 10)
    })

    sendResponse(res, {
      code: 201,
      message: 'User created Successfully',
      data: user
    })
  } catch (error) {
    if (error instanceof Error) {
      sendError(res, {
        code: 500,
        message: 'Internal server error',
        description: error.message
      })
    }
  }
}

export const login: any = async (req: Request, res: Response) => {
  try {
    const { email, password, pushToken } = req.body
    logger(LogType.INFO, `Push Token sent by User : ${pushToken}`)

    let user = await findUserByEmail(email)

    if (!user) {
      return sendError(res, {
        code: 400,
        message: 'Invalid email or password'
      })
    }

    const isPassowrdValid = await bcrypt.compare(password, user.password)
    if (!isPassowrdValid) {
      return sendError(res, {
        code: 400,
        message: 'Invalid email or password'
      })
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!,
      {
        expiresIn: process.env.JWT_EXPIRATION
      }
    )

    user = await updateUserData({
      id: user.id,
      pushTokens: [...user.pushTokens, pushToken]
    })

    logger(LogType.INFO, `${user}`)
    sendResponse(res, {
      message: 'Login successful',
      data: {
        token,
        user: {
          id: user.id,
          username: user.username,
          role: user.roles,
          pushTokens: user.pushTokens
        }
      }
    })
  } catch (error) {
    if (error instanceof Error) {
      sendError(res, {
        code: 500,
        message: 'Internal server error',
        description: error.message
      })
    }
  }
}

// export const getUser: any = async (req: Request, res: Response) => {
// 	try {
// 		let user = await findUserById(req.body.id);
// 		if (!user) {
// 			return sendError(res, {
// 				code: 400,
// 				message: `User With ${req.body.id} not found`
// 			});
// 		}

// 		sendResponse(res,{
// 			code : 200,
// 			message : ``,
// 			data : {
// 				pushTokens : user.pushTokens
// 			}
// 		})
// 	}catch(err) {

// 		sendError(res, {
// 			code: 500,
// 			message: 'Internal server error',
// 			description: logError(err)
// 		});
// 	}
// };

export const logout: any = async (req: Request, res: Response) => {
	try {
		await deletePushToken(req.body.id,req.body.pushToken);
		sendResponse(res,{
			code : 200,
			message : "Sucessfully Delete Push Token and Logged Out",
			data : {
				"message" : ":)"
			}
		})

	}catch(err) {
		logError(err);
		sendError(res, {
			code: 500,
			message: 'Internal server error',
			description: logError(err)
		});
	}
};

