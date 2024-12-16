import { NextFunction, Request, Response } from "express";
import { CustomeError } from "../utils/customeError";
import { decodeToken } from "../utils/decodeToken";

export const checkAuthentication = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) {
    res.status(401).json({ message: "Unauthorized Missing Token" });
    return;
  }
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Unauthorized Missing Token" });
    return;
  }

  const { _id } = decodeToken(token);
  if (!_id) {
    res.status(401).json({ message: "Something went wrong" });
    return;
  }

  if (req) {
    let userId = { _id: _id };
    (req.user as any) = userId;
  }
  next();
};
