import express from "express";
import swaggerUI from "swagger-ui-express";
import { swaggerSpec } from "../configurations/swagger.config";
import { errorHandler } from "../middlewares/errorHandler";
import authRouter from "../routers/auth.routes";

const app = express();

app.use(express.json());

app.use(`/api-docs`, swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// api routes =>

app.use(`/api/auth`, authRouter);

app.use(errorHandler);
export default app.listen(process.env.APP_PORT!, async () => {
  console.log(`App running at ${process.env.APP_PORT}`);
});
