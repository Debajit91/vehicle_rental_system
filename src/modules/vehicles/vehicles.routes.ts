import { Request, Response, Router } from "express";
import { pool } from "../../config/db";
import { vehicleController } from "./vehicles.controller";

const router = Router();

// Post Method
router.post('/', vehicleController.createVehicle)

export const vehicleRoutes = router;