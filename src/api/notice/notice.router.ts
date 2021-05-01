import { Router } from 'express';
import { NoticeController } from './notice.controller'

export const noticeRouter = () => {
    const router = Router();
    const controller = new NoticeController();

    router.post('/admission', controller.getAdmissionNotice);
    router.post('/campuslife', controller.getCampuslifeNotice);
    router.post('/plan', controller.getWeekplan);

    return router;
}