import { Router } from 'express';
import {InfoController} from './info.controller'

export const infoRouter = () => {
    const router = Router();
    const controller = new InfoController();

    router.post('/market', controller.getMarketlist);
    router.post('/lost', controller.getLostlist);

    return router;
}