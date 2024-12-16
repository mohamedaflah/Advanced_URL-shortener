import { NextFunction, Request, Response } from "express";
import { CustomeError } from "../utils/customeError";

export const errorHandler = (
  err: Error | CustomeError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomeError) {
    res
      .status(err.statusCode)
      .json({ status: false, message: err.message, details: err.details });
  }
  res.status(500).json({ status: false, message: err.message });
};
