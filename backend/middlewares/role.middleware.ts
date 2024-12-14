import { Request, Response, NextFunction } from 'express';

function checkUserRole(requiredRole: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    // const user = req.body;

    // if (!user) {
    //   return res.status(401).json({ message: 'Unauthorized' });
    // }

    // if (!user.roles || !user.roles.includes(requiredRole)) {
    //   return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
    // }

    next();
  };
}

export const isUser = () => checkUserRole('REGULAR_USER');
export const isAdmin = () => checkUserRole('ADMIN');
export const isScrapDealer = () => checkUserRole('SCRAP_DEALER');
export const isVehicleManager = () => checkUserRole('VEHICLE_MANAGER');
export const isFundraiser = () => checkUserRole('FUNDRAISER');
