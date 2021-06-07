import { etcRouter } from './api/etc/etc.router';
import { infoRouter } from './api/info/info.router';
import { libraryRouter } from './api/library/library.router';
import { menuRouter } from './api/menu/menu.router';
import { noticeRouter } from './api/notice/notice.router';
import { phoneRouter } from './api/phone/phone.router';
import { chitchatRouter } from './api/chitchat/chitchat.router';

export const router = (app : any) => {
    app.use('/natabee/notice/', noticeRouter());
    app.use('/natabee/phone/', phoneRouter());
    app.use('/natabee/library/', libraryRouter());
    app.use('/natabee/menu/', menuRouter());
    app.use('/natabee/info/', infoRouter());
    app.use('/natabee/etc/', etcRouter());
    app.use('/natabee/chitchat/', chitchatRouter());
}