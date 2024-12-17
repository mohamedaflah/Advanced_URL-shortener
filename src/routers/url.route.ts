// File: routers/url.route.ts
import { Router } from "express";
import { shortUrlController } from "../controllers/url/shorterUrl.controller";
import { rateLimitMiddleware } from "../middlewares/rateLimiter";
import { checkAuthentication } from "../middlewares/checkAuthentication";
import { getShortnerurlWithAlias } from "../controllers/url/shortnerUrlget.controller";

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
urlRoute.get(`/:shortId/analytics`)
export default urlRoute;
