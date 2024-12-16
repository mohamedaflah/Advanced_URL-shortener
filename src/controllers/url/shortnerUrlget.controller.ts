import { NextFunction, Request, Response } from "express";
import { URlModel } from "../../models/url.model";
import { getOsAndDeviceDetails } from "../../utils/getDeviceDetail";

export const getShortnerurlWithAlias = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const today = new Date().toISOString().split("T")[0];
    let urlData = await URlModel.findOne({ alias: req.params.alias });
    const { deviceName, osName } = getOsAndDeviceDetails(
      req.headers["user-agent"]!
    );
    if (!urlData) {
      // If no document exists for this short URL, create a new one
      urlData = new URlModel({ alias: req.params.alias });
    }
    urlData.totalClick += 1;
    const ip =
      req.ip || req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    if (!urlData.uniqueIp.includes(String(ip!))) {
      urlData.uniqueClicks += 1;
      urlData.uniqueIp.push(String(ip!));
    }
    const dateRecord = urlData.clicksByDate.find(
      (record) => record.date === today
    );
    if (dateRecord) {
      dateRecord.count += 1;
    } else {
      urlData.clicksByDate.push({ date: today, count: 1 });
    }

    if (urlData.os.osName == osName) {
      urlData.os.uniqueClicks += 1;
    } else {
    }

    await urlData.save();
  } catch (error) {
    next(error);
  }
};
