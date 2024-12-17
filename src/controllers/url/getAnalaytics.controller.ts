import { NextFunction, Request, Response } from "express";
import { URlModel } from "../../models/url.model";
import redisClient from "../../configurations/redis.config";

export const getAnalyticsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { shortId } = req.params;
    let existingAnalytics = await redisClient.get("aliasAnalytics");
    if (!existingAnalytics) {
      const analytics = await URlModel.findOne(
        { alias: shortId },
        {
          clicksByDate: false,
          uniqueIp: false,
          alias: 0,
          shortId: false,
          longUrl: false,
          _id: false,
          topic: false,
          createdAt: false,
          updatedAt: false,
          __v: false,
        }
      );
      await redisClient.set("aliasAnalytics", JSON.stringify(analytics), {
        EX: 600,
      });
    }
    const newAnalytics = await redisClient.get("aliasAnalytics");

    res.status(200).json(newAnalytics ? JSON.parse(newAnalytics) : null);
  } catch (error) {
    next(error);
  }
};
