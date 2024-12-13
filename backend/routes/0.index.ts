import Router from 'express';
import NotifRouter from './notif.route';
import PostRouter from './post.route';
import CheckpointRouter from './checkpoint.route';
import AuthRouter from './auth.route';

import { sendResponse } from '../utils/GenericResponse';

const router = Router();

router.use('/notification', NotifRouter);
router.use('/blog', PostRouter);
router.use('', NotifRouter);
router.use('/auth', AuthRouter);

router.use("/checkpoints",CheckpointRouter);
router.get('/ping', (req, res) => {
	sendResponse(res, {
		code: 200,
		message: 'pong'
	});
});

export default router;
