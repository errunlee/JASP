import Router from 'express';
import NotifRouter from './notif.route';
import PostRouter from './post.route';

const router = Router();

router.use('', NotifRouter);
router.use('', PostRouter);

export default router;
