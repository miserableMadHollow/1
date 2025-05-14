// server/swagger.js
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Dark Souls 3 Weapons API',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.js'], // Указывает, где искать JSDoc-комментарии
};

const specs = swaggerJSDoc(options);

export default (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};