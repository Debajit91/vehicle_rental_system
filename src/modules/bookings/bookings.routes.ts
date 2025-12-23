import { Router } from "express";
import { bookingController } from "./bookings.controller";

const router = Router();

// create booking
router.post("/", bookingController.createBooking);

// get booking
router.get("/", bookingController.getBooking)

export const bookingRoutes = router;
