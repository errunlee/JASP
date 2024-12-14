import { Router } from 'express';
import { login, logout, register } from '../controllers/auth.controller';
import {authenticateUser} from '../middlewares/authenticate.middleware';

const router = Router();

router.post('/login', login);
router.post('/register', register);
router.get('/authTest',authenticateUser,async (req,res)=> {
    console.log("hello");
})

// router.get('/getUserPushTokens',getUser);
router.post('/logout',logout);

export default router;