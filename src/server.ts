import express from 'express';
import logger from 'morgan';
import { router } from './main.router';

const app = express();

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