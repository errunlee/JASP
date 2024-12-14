const swaggerJSDoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Your API Title", // Name of your API
      version: "1.0.0",        // Version of your API
      description: "API Documentation for Your Project",
    },
    servers: [
      {
        url: "http://localhost:3000", // Replace with your server URL
      },
    ],
  },
  apis: ["../routes/*.ts"], // Path to your route files (see example below)
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

module.exports = swaggerSpec;