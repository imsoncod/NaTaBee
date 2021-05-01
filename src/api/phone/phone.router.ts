import { Router } from 'express';
import { PhoneController } from './phone.controller';

export const phoneRouter = () => {
    const router = Router();
    const controller = new PhoneController();

    router.post('/name', controller.getPhoneByName);
    router.post('/dept', controller.getPhoneByDept);

    return router;
}