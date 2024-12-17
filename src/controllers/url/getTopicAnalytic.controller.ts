import { NextFunction, Request, Response } from "express";
import { URlModel } from "../../models/url.model";
import redisClient from "../../configurations/redis.config";

export async function getTopicAnalyticController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { topic } = req.params;
    const topicAnalytic = await redisClient.get("topicAnalytics");
    if (!topicAnalytic) {
      const analytics = await URlModel.find(
        { topic: topic },
        {
          uniqueIp: false,
          alias: 0,
          shortId: false,
          longUrl: false,
          _id: false,
          topic: false,
          createdAt: false,
          updatedAt: false,
          __v: false,
          os: false,
          device: false,
        }
      );
      await redisClient.set("topicAnalytics", JSON.stringify(analytics), {
        EX: 600,
      });
    }
    const newTopicAnalytics = await redisClient.get("topicAnalytics");
    if (newTopicAnalytics && newTopicAnalytics?.length <= 0) {
      res.status(404).json({ message: "Analytics not found" });
      return;
    }
    res
      .status(200)
      .json(newTopicAnalytics ? JSON.parse(newTopicAnalytics) : null);
  } catch (error) {
    next(error);
  }
}
