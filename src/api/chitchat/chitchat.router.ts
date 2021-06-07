import { Router } from 'express';
import {ChitchatController} from './chitchat.controller'

export const chitchatRouter = () => {
    const router = Router();
    const controller = new ChitchatController();
	
    router.post('/', controller.getMessage);

    return router;
}