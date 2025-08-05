import express from 'express'; // ✅ This is missing in your file
import {
  registerUser,
  loginUser,
  getAllUsers,
  updateUserScore
} from '../controllers/user.controller.js';

const router = express.Router();

// Routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', getAllUsers);
router.put('/score/:name', updateUserScore);

export default router;
