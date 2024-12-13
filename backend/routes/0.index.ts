import Router from 'express';
import NotifRouter from './notif.route';
import PostRouter from './post.route';

import { sendResponse } from '../utils/GenericResponse';

const router = Router();

router.use('', NotifRouter);
router.use('', PostRouter);

router.get('/ping', (req, res) => {
	sendResponse(res, {
		code: 200,
		message: 'pong'
	});
});

export default router;
