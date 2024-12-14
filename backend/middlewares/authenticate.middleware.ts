import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const authenticateUser :any = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    // Verify the token and decode the payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    // Attach the user payload to req.user
    //@ts-ignore
    req.user = decoded as any; // Add type as necessary, e.g., `as User`

    next(); // Proceed to the next middleware
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

