import { Router } from "express";
import { passport } from "../configurations/passport.config";
import { googleCallbackControlller } from "../controllers/auth/googlecallback.controller";
const authRouter = Router();

authRouter.get(
  `/google`,
  passport.authenticate("google", { scope: ["profile", "email"] })
);

authRouter.get(
  `/google/callback`,
  passport.authenticate("google", { session: false }),
  googleCallbackControlller
);
export default authRouter;
