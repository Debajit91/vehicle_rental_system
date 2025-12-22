import { Router } from "express";
import { vehicleController } from "./vehicles.controller";

const router = Router();

// Post Method
router.post('/', vehicleController.createVehicle)

// get all vehicles
router.get('/', vehicleController.getVehicles)

// get single vehicle
router.get('/:vehicleId', vehicleController.getSingleVehicle)

// update vehicle
router.put('/:vehicleId', vehicleController.updateVehicle)

// delete vehicle
router.delete('/:vehicleId', vehicleController.deleteVehicle)

export const vehicleRoutes = router;