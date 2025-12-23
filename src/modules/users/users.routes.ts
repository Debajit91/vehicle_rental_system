import { Router } from "express";
import { userControllers } from "./users.controller";

const router = Router();

// get all users
router.get('/', userControllers.getUsers)

// update user
router.put('/:userId', userControllers.updateUser)

export const userRoutes = router;