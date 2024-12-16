import { NextFunction, Request, Response } from "express";
import { generateToken } from "../../utils/generateToken";
import { IUser } from "../../types/User";
export const googleCallbackControlller = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: IUser = req.user as IUser;
    const token = generateToken({ _id: user?._id });
    delete user?.password;
    res
      // .cookie("token", token, { httpOnly: true, secure: true })
      .json({ token, user });
  } catch (error) {  
    next(error);
  }
};
