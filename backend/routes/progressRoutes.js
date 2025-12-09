import express from 'express'
import { getDailyProgress, getWeeklySummary, markTaskComplete } from '../controllers/progressController.js';
import { authMiddleware } from "../middlewares/authMiddleware.js";

// router object for progress
export const progressRouter= express.Router()

// Route for marking task complete
progressRouter.post("/mark", authMiddleware, markTaskComplete);

// Route for checking weekly summary
progressRouter.get("/weekly-summary", authMiddleware, getWeeklySummary);

// Route for checking daily progress
progressRouter.get("/daily", authMiddleware, getDailyProgress);

