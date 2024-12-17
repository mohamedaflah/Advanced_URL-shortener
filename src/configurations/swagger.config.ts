import swaggerJSDoc from "swagger-jsdoc";
import path from "path";
const swaggerDef = {
  openapi: "3.0.0",
  info: {
    title: "URL shortener",
    version: "1.0.0",
    description: `A Advanced URL shortener Application`,
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};
const swaggerOptions = {
  definition: swaggerDef,
  apis: [
    path.resolve(__dirname, "../routers/*.ts"),
    path.resolve(__dirname, "../routers/*.route.ts"),
    path.resolve(__dirname, "../controllers/**/*.controller.ts"),
  ],
};

const swaggerSpec = swaggerJSDoc({ ...swaggerOptions });
export { swaggerSpec };
