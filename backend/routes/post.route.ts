import Router from 'express';
import {
	getAll,
	getById,
	create,
	update,
	deleteById as remove
} from '../controllers/post.controller';
import { upload } from '../config/configs';
const router = Router();

router.get('/', getAll);
router.post('/',upload.single("file"), create);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', remove);

export default router;
