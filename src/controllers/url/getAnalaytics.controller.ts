import { NextFunction, Request, Response } from "express";
import { URlModel } from "../../models/url.model";

export const getAnalyticsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { shortId } = req.params;
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
    res.status(200).json(analytics);
  } catch (error) {
    next(error);
  }
};
