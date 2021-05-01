import { Router } from 'express';
import {EtcController} from './etc.controller'

export const etcRouter = () => {
    const router = Router();
    const controller = new EtcController();
	
    router.post('/dept', controller.getDeptInfo);
    router.post('/news', controller.getInhaNews);

    return router;
}