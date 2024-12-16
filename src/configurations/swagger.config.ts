import swaggerJSDoc from "swagger-jsdoc";
const swaggerDef = {
  openapi: "3.0.0",
  info: {
    title: "url-shortner",
    version: "1.0.0",
    description: "url shortener",
  },
};
const swaggerOptions = {
  definition: swaggerDef,
  apis: ["../routers/*.ts"],
};
const swaggerSpec = swaggerJSDoc({ ...swaggerOptions });
export { swaggerSpec };
