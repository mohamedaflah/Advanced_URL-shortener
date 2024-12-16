import rateLimiter from "express-rate-limit";

const rateLimitMiddleware = rateLimiter({
  windowMs: 60 * 1000,
  max: 5,
  message: "You have exceeded your 5 requests per minute limit.",
  headers: true,
  handler: (req, res) => {
    console.log("Rate limit exceeded for IP:", req.ip);
    res.status(429).json({ error: "Too many requests" });
  },
});
export { rateLimitMiddleware };
