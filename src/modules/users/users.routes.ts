import { Router } from "express";
import { userControllers } from "./users.controller";

const router = Router();

// get all users
router.get('/', userControllers.getUsers)

export const userRoutes = router;