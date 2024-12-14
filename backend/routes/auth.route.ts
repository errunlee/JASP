import { Router } from 'express';
import { login, register } from '../controllers/auth.controller';
import {authenticateUser} from '../middlewares/authenticate.middleware';

const router = Router();

router.post('/login', login);
router.post('/register', register);
router.get('/authTest',authenticateUser,async (req,res)=> {
    console.log("hello");
})

export default router;