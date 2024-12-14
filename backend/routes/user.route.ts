
import express from 'express';
import { isScrapDealer } from '../middlewares/role.middleware';
import { getAllProductsById, saveProduct, updateUser } from '../controllers/user.controller';
import { upload } from '../config/configs';

const router = express.Router();

router.put("/:id/update",upload.fields([
    { name: 'profile', maxCount: 1 },
    { name: 'orgImage', maxCount: 1 },
]),updateUser)
router.post("/:id/saveProduct",saveProduct)
router.get("/:id/getProducts",getAllProductsById)

export default router;
