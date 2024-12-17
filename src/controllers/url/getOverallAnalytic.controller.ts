import { NextFunction, Request, Response } from "express";
import { IUser } from "../../types/User";
import { URlModel } from "../../models/url.model";

export async function getOverallAnalytics(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { _id: userId } = req.user as IUser;
    const analytics = await URlModel.find(
      { userId: userId },
      {
        topic: false,
        uniqueIp: false,
        _id: false,
        __v: false,
        createdAt: false,
        updatedAt: false,
        userId: false,  
      }
    );
    res.status(200).json(analytics);
  } catch (error) {
    next(error);
  }
}
