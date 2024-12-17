import { NextFunction, Request, Response } from "express";
import { CustomeError } from "../../utils/customeError";
// import { createUniqueAlias } from "../../utils/createUniqueAlias";
import { URlModel } from "../../models/url.model";
import { UAParser } from "ua-parser-js";
import { IUser } from "../../types/User";
// import { nanoid } from "nanoid";
export const shortUrlController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let { url, alias, topic } = req.body;

    // Validate URL
    if (!url || !/^https?:\/\/[^\s/$.?#].[^\s]*$/.test(url)) {
      throw new CustomeError("Invalid URL: ", 400, "Invalid url provided");
    }
    // const shortId = nanoid(6);
    // if (!alias) {
    //   alias = createUniqueAlias(url);
    // }
    const aliasExist = await URlModel.findOne({ alias: alias });
    if (aliasExist) {
      alias = `${alias}-${crypto.randomUUID().slice(0, 4)}`;
    }
    const parser = new UAParser(req.headers["user-agent"]);
    const result = parser.getResult();

    const osInfo = {
      osName: result.os.name || "Unknown",
      osType: result.os.version || "Unknown",
    };

    console.log("🚀 ~ osInfo:", osInfo);
    const deviceInfo = {
      deviceName: result.device.model || "Unknown",
      deviceType: result.device.type || "Unknown",
    };
    console.log("🚀 ~ deviceInfo:", deviceInfo);
    const shortId = crypto.randomUUID().slice(0, 6);
    if (!alias) {
      alias = shortId;
    }
    const newUrl = new URlModel({
      alias: alias,
      topic: topic && topic,
      longUrl: url,
      shortUrl: `${process.env.BASE_URL!}/api/shortner/${alias}`,
      os: osInfo,
      device: deviceInfo,
      userId: (req.user as IUser)?._id,
      shortId: shortId,
    });
    console.log({ alias, url, topic });

    await newUrl.save();
    res.status(201).json({
      shortUrl: `${process.env.BASE_URL!}/api/shortner/${alias}`,
      createdAt: newUrl.createdAt,
    });
  } catch (error) {
    next(error);
  }
};
