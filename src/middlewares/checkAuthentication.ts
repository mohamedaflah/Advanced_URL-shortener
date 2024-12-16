import { NextFunction, Request, Response } from "express";
import { CustomeError } from "../utils/customeError";
import { decodeToken } from "../utils/decodeToken";

export const checkAuthentication = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.headers.authorization) {
      throw new CustomeError("Unauthorized", 401, "Missing token");
    }
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      throw new CustomeError("Unauthorized", 401, "Missing token");
    }

    if (req && req?.user && req.user?._id) {
      req.user._id = decodeToken(token)._id;
    }
    next();
  } catch (error: any) {
    throw new CustomeError(error.message, 500, "Wrong");
  }
};
