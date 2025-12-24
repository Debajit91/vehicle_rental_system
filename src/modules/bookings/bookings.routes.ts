import { Router } from "express";
import { bookingController } from "./bookings.controller";
import auth from "../../middleware/auth";

const router = Router();

// create booking
router.post("/", auth("admin", "customer"), bookingController.createBooking);

// get booking
router.get("/", auth("admin", "customer"), bookingController.getBooking)

export const bookingRoutes = router;
