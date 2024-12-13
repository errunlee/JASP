import Router from 'express';
import {
	getAll,
	getById,
	create,
	update,
	deleteById as remove
} from '../controllers/post.controller';
import { upload } from '../config/configs';
import { promisify } from 'util';
const router = Router();

router.get('/', getAll);
router.post(
	'/',
	promisify(upload.single('file')),
	async (req, res, next) => {
		console.log(req.body);
		next();
	},
	create
);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', remove);

export default router;
