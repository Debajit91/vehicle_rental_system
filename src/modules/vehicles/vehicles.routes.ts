import { Router } from "express";
import { vehicleController } from "./vehicles.controller";
import auth from "../../middleware/auth";

const router = Router();

// Post Method
router.post('/', auth("admin"), vehicleController.createVehicle)

// get all vehicles
router.get('/', vehicleController.getVehicles)

// get single vehicle
router.get('/:vehicleId', vehicleController.getSingleVehicle)

// update vehicle
router.put('/:vehicleId', auth("admin"), vehicleController.updateVehicle)

// delete vehicle
router.delete('/:vehicleId', auth("admin"), vehicleController.deleteVehicle)

export const vehicleRoutes = router;