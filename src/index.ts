import "dotenv/config";
import "./configurations/mongoose.config";
import server from "./application/app";
import { connectRedis, disconnectRedis } from "./configurations/redis.config";
(async () => {
  try {
    await connectRedis();

    process.on("SIGTERM", async () => {
      console.log("SIGTERM received. Shutting down gracefully");
      server.close();
      await disconnectRedis();
      process.exit(0);
    });
  } catch (error) {
    console.error("Failed to start server", error);
    process.exit(1);
  }
})();
