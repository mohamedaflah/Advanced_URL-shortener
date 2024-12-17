import request from "supertest";
import "dotenv/config";
import express, { response, Response } from "express";
import { checkAuthentication } from "../middlewares/checkAuthentication";
import { shortUrlController } from "../controllers/url/shorterUrl.controller";
import { rateLimitMiddleware } from "../middlewares/rateLimiter";
import { getShortnerurlWithAlias } from "../controllers/url/shortnerUrlget.controller";
import { getAnalyticsController } from "../controllers/url/getAnalaytics.controller";
import { getTopicAnalyticController } from "../controllers/url/getTopicAnalytic.controller";
import { getOverallAnalytics } from "../controllers/url/getOverallAnalytic.controller";

jest.mock("../controllers/url/getAnalaytics.controller");
jest.mock("../controllers/url/getOverallAnalytic.controller");
jest.mock("../controllers/url/getTopicAnalytic.controller");
jest.mock("../controllers/url/shortnerUrlget.controller");
jest.mock("../controllers/url/shorterUrl.controller");
jest.mock("../middlewares/checkAuthentication", () => ({
  checkAuthentication: jest.fn((req, res, next) => next()), // Mock authentication middleware
}));
jest.mock("../middlewares/rateLimiter", () => ({
  rateLimitMiddleware: jest.fn((req, res, next) => next()), // Mock rate limiter middleware
}));
describe("URL shortener Routes", () => {
  let app = express();

  beforeEach(() => {
    app.use(express.json());
    const urlRoute = require("../routers/url.route");
    app.use("/api/shortner", urlRoute);
  });

  describe("POST /api/shortner", () => {
    it("should create a shortener url when authenticated", async () => {
      // (checkAuthentication as jest.Mock).mockImplementation((req, res, next) =>
      //   next()
      // );

      (shortUrlController as jest.Mock).mockImplementation(
        (req, res: Response, next) => {
          res.status(201).json({
            shortUrl: "http://localhost:4200/api/shortner/test-alias",
            createdAt: new Date().toISOString(),
          });
        }
      );

      const response = await request(app)
        .post("/api/shortner")
        .send({
          url: "https://example.com",
          alias: "test-alias",
          topic: "test",
        })
        .set("Authorization", "Bearer test-token");

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("shortUrl");
      expect(response.body).toHaveProperty("createdAt");
    });

    it("should return 401 if not authenticated", async function () {
      (checkAuthentication as jest.Mock).mockImplementation(function (
        req,
        res,
        next
      ) {
        expect(response.status).toBe(401);
      });

      const response = await request(app).post("/api/shortner").send({
        url: "https://example.com",
        alias: "test-alias",
        topic: "test",
      });

      expect(response.status).toBe(401);
    });
  });

  describe(`GET /:shortId`, () => {
    it("should redirect to original url", async () => {
      // (rateLimitMiddleware as unknown as jest.Mock).mockImplementation(
      //   (req, res, next) => next()
      // );

      (getShortnerurlWithAlias as jest.Mock).mockImplementation((req, res) => {
        res.redirect("https://example.com");
      });
      const response = await request(app).get("/test-alias");
      expect(response.status).toBe(302);
    });
  });

  describe("GET /:shortId/analytics", () => {
    it("should return analytics for a specific short URL", async () => {
      // Mock authentication middleware to pass
      // (checkAuthentication as jest.Mock).mockImplementation((req, res, next) =>
      //   next()
      // );

      // Mock the getAnalyticsController
      (getAnalyticsController as jest.Mock).mockImplementation((req, res) => {
        res.status(200).json({
          totalClick: 10,
          uniqueClicks: 5,
          os: {
            osName: "Windows",
            uniqueClicks: 3,
          },
          device: {
            deviceName: "Desktop",
            uniqueClicks: 5,
          },
        });
      });

      const response = await request(app)
        .get("/test-alias/analytics")
        .set("Authorization", "Bearer test-token");

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("totalClick");
      expect(response.body).toHaveProperty("uniqueClicks");
    });

    it("should return 401 if not authenticated for analytics", async () => {
      // Mock authentication middleware to fail
      // (checkAuthentication as jest.Mock).mockImplementation(
      //   (req, res, next) => {
      //     res.status(401).json({ message: "Unauthorized" });
      //   }
      // );

      const response = await request(app).get("/test-alias/analytics");

      expect(response.status).toBe(401);
    });
  });

  describe("GET /analytics/topic/:topic", () => {
    it("should return analytics for a specific topic", async () => {
      // Mock authentication middleware to pass
      // (checkAuthentication as jest.Mock).mockImplementation((req, res, next) =>
      //   next()
      // );

      // Mock the getTopicAnalyticController
      (getTopicAnalyticController as jest.Mock).mockImplementation(
        (req, res) => {
          res.status(200).json([
            {
              topic: "test",
              totalClick: 10,
              uniqueClicks: 5,
            },
          ]);
        }
      );

      const response = await request(app)
        .get("/api/shortner/analytics/topic/test")
        .set("Authorization", "Bearer test-token");

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("GET /analytics/overall", () => {
    it("should return overall analytics", async () => {
      // Mock authentication middleware to pass
      // (checkAuthentication as jest.Mock).mockImplementation((req, res, next) =>
      //   next()
      // );

      // Mock the getOverallAnalytics controller
      (getOverallAnalytics as jest.Mock).mockImplementation((req, res) => {
        res.status(200).json([
          {
            totalClick: 100,
            uniqueClicks: 50,
          },
        ]);
      });

      const response = await request(app)
        .get("/api/shortner/analytics/overall")
        .set("Authorization", "Bearer test-token");

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });
});
