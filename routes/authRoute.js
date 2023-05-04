import { Router } from 'express';
const router = Router();
import { getSignup, postSignup, getLogin, postLogin, postLogout } from '../src/controllers/userController.js';

router.get('/signup', getSignup);
router.post('/signup', postSignup);
router.get('/login', getLogin);
router.post('/login', postLogin);
router.post('/logout', postLogout);

export default router;
