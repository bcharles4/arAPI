import express from 'express';
import cors from 'cors';

import { registerAdmin, loginAdmin } from "../controllers/admin.controller.js";



import userRoutes from '../routes/user.routes.js'; // ✅ import user routes

import { connectDB } from './config/db.js';

const app = express();
app.use(express.json());
connectDB();

app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));

// Routes

// Admin routes
app.post("/admin/register", registerAdmin);
app.post("/admin/login", loginAdmin);


app.use('/api/users', userRoutes); // ✅ mount user routes here

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
