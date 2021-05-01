import { Router } from 'express';
import {MenuController} from './menu.controller'

export const menuRouter = () => {
    const router = Router();
    const controller = new MenuController();

    router.post('/student', controller.getStudentMenu);
    router.post('/professor', controller.getProfessorMenu);

    return router;
}