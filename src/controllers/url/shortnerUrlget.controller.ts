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
    let urlData = await URlModel.findOne({ alias: req.params.shortId });
    const { deviceName, osName } = getOsAndDeviceDetails(
      req.headers["user-agent"]!
    );
    if (!urlData) {
      // If no document exists for this short URL, create a new one
      urlData = new URlModel({ alias: req.params.shortId });
    }
    urlData.totalClick += 1;
    const ip =
      req.ip || req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    if (!urlData.uniqueIp.includes(String(ip!))) {

      urlData.uniqueClicks += 1;

      console.log(urlData.uniqueClicks,' IIO');
      
      urlData.uniqueIp.push(String(ip!));

      if (!urlData.os || urlData.os.osName !== osName) {
        urlData.os = urlData.os || {};
        urlData.os.osName = osName;
        urlData.os.uniqueUsers += 1;
      }

      if (!urlData.device || urlData.device.deviceName !== deviceName) {
        urlData.device = urlData.device || {};
        urlData.device.deviceName = deviceName;
        urlData.device.uniqueUsers += 1;
      }
    }
    const dateRecord = urlData.clicksByDate.find(
      (record) => record.date === today
    );
    console.log("🚀 ~ today:", urlData.uniqueClicks)
    if (dateRecord) {
      dateRecord.count += 1;
    } else {
      urlData.clicksByDate.push({ date: today, count: 1 });
    }

    if (urlData.os.osName == osName) {
      urlData.os.uniqueClicks += 1;
    } else {
      urlData.os = {
        osType: urlData.os.osType,
        osName: osName,
        uniqueClicks: 1,
        uniqueUsers: urlData.os?.uniqueUsers || 0,
      };
    }
    if (urlData.device.deviceName === deviceName) {
      urlData.device.uniqueClicks += 1;
    } else {
      urlData.device = {
        deviceType: urlData.device.deviceType,
        deviceName,
        uniqueClicks: 1,
        uniqueUsers: urlData.device?.uniqueUsers || 0,
      };
    }

    await urlData.save();
    res.status(302).redirect(`${urlData?.longUrl}`);
  } catch (error) {
    next(error);
  }
};
