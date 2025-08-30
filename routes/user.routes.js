import express from 'express'; // ✅ This is missing in your file
import {
  registerUser,
  loginUser,
  getAllUsers,
  updateUserScore,
  getUserByName,
  updateUserByName
} from '../controllers/user.controller.js';

const router = express.Router();

// Routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', getAllUsers);
router.put('/score/:name', updateUserScore);
router.get("/name/:name", getUserByName);
router.put("/name/:name", updateUserByName); // ✅ edit by name



export default router;
