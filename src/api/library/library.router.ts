import { Router } from 'express';
import {LibraryController} from './library.controller'

export const libraryRouter = () => {
    const router = Router();
    const controller = new LibraryController();

    router.post('/search', controller.getBooklist);
    router.post('/seast', controller.registSeat);

    return router;
}