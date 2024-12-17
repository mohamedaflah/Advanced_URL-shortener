import { NextFunction, Request, Response } from "express";
import { URlModel } from "../../models/url.model";

export async function getTopicAnalyticController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { topic } = req.params;
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
    if (analytics?.length <= 0) {
      res.status(404).json({ message: "Analytics not found" });
      return;
    }
    res.status(200).json(analytics);
  } catch (error) {
    next(error);
  }
}
