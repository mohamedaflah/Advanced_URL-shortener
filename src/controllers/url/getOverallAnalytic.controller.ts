import { NextFunction, Request, Response } from "express";
import { IUser } from "../../types/User";
import { URlModel } from "../../models/url.model";
import redisClient from "../../configurations/redis.config";

export async function getOverallAnalytics(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { _id: userId } = req.user as IUser;
    const overallAnalytics = await redisClient.get("overallAnalytics");
    if (!overallAnalytics) {
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
      await redisClient.set("overallAnalytics", JSON.stringify(analytics), {
        EX: 600,
      });
    }
    const analytics = await redisClient.get("overallAnalytics");
    res.status(200).json(analytics ? JSON.parse(analytics) : null);
  } catch (error) {
    next(error);
  }
}
