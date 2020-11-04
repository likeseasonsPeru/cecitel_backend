const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
    swaggerDefinition: {
      info: {
        title: "CECITEL BACKEND",
        version: '1.0.0',
      },
    },
    apis: ["src/routes/*.js"],
  }
  
  module.exports = swaggerJsDoc(swaggerOptions);