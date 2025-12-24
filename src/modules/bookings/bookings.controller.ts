import { Request, Response } from "express";
import { bookingServices } from "./bookings.services";
import { QueryResult } from "pg";

const createBooking = async (req: Request, res: Response) => {
  try {
    const result = await bookingServices.createBooking(req.body);

    if (!result.rows.length) {
      res.status(400).json({
        success: false,
        message: "Invalid customer or vehicle or invalid date range",
      });
    }
    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getBooking = async (req: Request, res: Response) => {
  try {
    const result = await bookingServices.getBooking();

    if (!result.rows.length) {
      res.status(404).json({
        success: false,
        message: "No Booking Found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Bookings retrieved successfully",
        data: result.rows,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateBooking = async (req: any, res: Response) => {
  const { status } = req.body;
  const user = req.user;
  const bookingId = Number(req.params.bookingId);
  try {
    let result : QueryResult<any>;

    if (user.role === "customer") {
        if (status !== "cancelled") {
          return res.status(403).json({
            success: false,
            message: "Customer can only set status to 'cancelled'",
          });
        }

        result = await bookingServices.cancelBookingAsCustomer(user.id, bookingId);

        if (!result.rows.length) {
          return res.status(404).json({
            success: false,
            message: "Booking not found or you are not allowed to cancel it",
          });
        }

        return res.status(200).json({
          success: true,
          message: "Booking cancelled successfully",
          data: result.rows[0],
        });
      }

    if (user.role === "admin") {
        if (status !== "returned") {
          return res.status(403).json({
            success: false,
            message: "Admin can only set status to 'returned' on this endpoint",
          });
        }

        result = await bookingServices.updateBookingAsAdmin(status, bookingId);

        if (!result.rows.length) {
          return res.status(404).json({
            success: false,
            message: "Booking not found or not returnable",
          });
        }

        return res.status(200).json({
          success: true,
          message: "Booking marked as returned. Vehicle is now available",
          data: result.rows[0],
        });
      }

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const bookingController = {
  createBooking,
  getBooking,
  updateBooking,
};
