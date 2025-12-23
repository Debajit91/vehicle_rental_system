import { Router } from "express";
import { userControllers } from "./users.controller";

const router = Router();

// get all users
router.get('/', userControllers.getUsers)

// update user
router.put('/:userId', userControllers.updateUser)

// delete user
router.delete('/:userId', userControllers.deleteUser)

export const userRoutes = router;