import express from 'express';
import logger from 'morgan';
import { router } from './main.router';
import swaggerJSDoc from 'swagger-jsdoc';
import { swaggerOption } from './config/swagger';
import swaggerUi from 'swagger-ui-express';

const app = express();

const swaggerSpec = swaggerJSDoc(swaggerOption);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(logger('dev'));

router(app);

app.get('/', (req, res) => {
    res.json({ServerStatus : ' ON🚀'});
});

const options = {
    host : '0.0.0.0',
    port : 80
}

app.listen(options, () => {
    console.log('Server ON 🚀');
})