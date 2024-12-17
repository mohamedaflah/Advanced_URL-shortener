import { Router } from "express";
import { passport } from "../configurations/passport.config";
import { googleCallbackControlller } from "../controllers/auth/googlecallback.controller";
const authRouter = Router();

/**
 * @swagger
 * /api/auth/google:
 *   get:
 *     summary: Redirect to google email selection page
 *     tags: [Google authentication]
 *     responses:
 *       302:
 *         description: Redirect to the original URL
 *       404:
 *         description: Short URL not found
 *       429:
 *         description: Too many requests
 */
authRouter.get(
  `/google`,
  passport.authenticate("google", { scope: ["profile", "email"] })
);

/**
 * @swagger
 * /api/auth/google/callback:
 *   get:
 *     summary: When user select email from google account redirect to here
 *     tags: [Google authentication]
 *     responses:
 *       302:
 *         description: Redirect to the original URL
 *       404:
 *         description: Short URL not found
 *       429:
 *         description: Too many requests
 */
authRouter.get(
  `/google/callback`,
  passport.authenticate("google", { session: false }),
  googleCallbackControlller
);
export default authRouter;
