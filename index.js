const express = require('express');
const morgan = require('morgan');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const userRoutes = require('./routes/users');
const movieRoutes = require('./routes/movies');
const errorHandling = require('./middleware/errorHandling');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.1.9',
    info: {
      title: 'API Movie',
      version: '1.0.0',
      description: 'Informasi API Movie',
      servers: ['http://localhost:3000'],
    },
    components: {
      securitySchemes: {
        MyAuth: {
          type: 'apiKey',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./routes/*.js'],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use(morgan('common'));
app.use(express.json());

app.use('/user', userRoutes);
app.use('/movies', movieRoutes);

app.use(errorHandling);

app.listen(PORT, () => {
  console.log(`Server running pada port ${PORT}`);
});