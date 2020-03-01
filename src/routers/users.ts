import { Router } from 'express';
import {
  loginController,
  signUpController,
  logoutController,
  getUserByIdController,
  getUsersController,
} from '../controllers/users';

const router = Router();

router.post('/login', loginController);
router.post('/signup', signUpController);
router.get('/logout', logoutController);
router.get('/:id', getUserByIdController);
router.get('/', getUsersController);

export default router;
