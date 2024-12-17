// File: routers/url.route.ts
import { Router } from "express";
import { shortUrlController } from "../controllers/url/shorterUrl.controller";
import { rateLimitMiddleware } from "../middlewares/rateLimiter";
import { checkAuthentication } from "../middlewares/checkAuthentication";
import { getShortnerurlWithAlias } from "../controllers/url/shortnerUrlget.controller";
import { getAnalyticsController } from "../controllers/url/getAnalaytics.controller";

const urlRoute = Router();
/**
 * @swagger
 * /api/shortner:
 *   post:
 *     summary: Create a shortener url
 *     tags: [URL shortener]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *                 description: The original url to be shortened
 *                 example: https://github.com/96pinku/-URL-Shortner-Application
 *               alias:
 *                 type: string
 *                 description: Custom alias (optional)
 *                 example: git-hub
 *               topic:
 *                 type: string
 *                 description: Add special category
 *                 example: git-hub
 *     responses:
 *       201:
 *         description: Successfully created short URL
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 shortUrl:
 *                   type: string
 *                   example: http://localhost:4200/api/shortner/3a741c
 *                 createdAt:
 *                   type: timestamp.
 *                   example: 2024-12-17T05:23:26.441Z
 *       400:
 *         description: Bad request (invalid URL or alias)
 *       401:
 *         description: Unauthorized access
 *       429:
 *         description: Too many requests
 */
urlRoute.post(
  `/`,
  rateLimitMiddleware,
  checkAuthentication,
  shortUrlController
);
/**
 * @swagger
 * /api/shortner/{alias}:
 *   get:
 *     summary: Redirect to original URL
 *     tags: [URL shortener]
 *     parameters:
 *       - in: path
 *         name: shortId
 *         required: true
 *         schema:
 *           type: string
 *         description: Short URL identifier
 *     responses:
 *       302:
 *         description: Redirect to the original URL
 *       404:
 *         description: Short URL not found
 *       429:
 *         description: Too many requests
 */
urlRoute.get("/:shortId", rateLimitMiddleware, getShortnerurlWithAlias);

/**
 * @swagger
 * /api/shortner/{alias}/analytics:
 *   get:
 *     summary: Retrieve analytics of url based on given alias
 *     tags: [URL shortener]
 *     parameters:
 *       - in: path
 *         name: alias
 *         required: true
 *         schema:
 *           type: string
 *         description: Short URL alias
 *     responses:
 *       200:
 *         description: Successfully retrieved URL analytics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 os:
 *                   type: object
 *                   properties:
 *                     osName:
 *                       type: string
 *                       example: Windows
 *                     osType:
 *                       type: string
 *                       example: 10
 *                     uniqueClicks:
 *                       type: number
 *                       example: 1
 *                     uniqueUsers:
 *                       type: number
 *                       example: 1
 *                 device:
 *                   type: object
 *                   properties:
 *                     deviceName:
 *                       type: string
 *                       example: Android
 *                     deviceType:
 *                       type: string
 *                       example: 13
 *                     uniqueClicks:
 *                       type: number
 *                       example: 1
 *                     uniqueUsers:
 *                       type: number
 *                       example: 1
 *                 shortUrl:
 *                   type: string
 *                   example: http://localhost:4200/api/shortner/git-8793
 *                 totalClick:
 *                   type: number
 *                   example: 1
 *                 uniqueClicks:
 *                   type: number
 *                   example: 1
 *       302:
 *         description: Redirect to the original URL
 *       404:
 *         description: Short URL not found
 *       429:
 *         description: Too many requests
 */
urlRoute.get(`/:shortId/analytics`, getAnalyticsController);
export default urlRoute;
