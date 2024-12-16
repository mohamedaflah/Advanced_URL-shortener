import { Router } from "express";
import { shortUrlController } from "../controllers/url/shorterUrl.controller";
import { rateLimitMiddleware } from "../middlewares/rateLimiter";
import { checkAuthentication } from "../middlewares/checkAuthentication";

const urlRoute = Router();

urlRoute.post(
  `/shorten`,
  rateLimitMiddleware,
  checkAuthentication,
  shortUrlController
);

export default urlRoute;
