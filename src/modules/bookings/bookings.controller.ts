import { Request, Response } from "express";
import { bookingServices } from "./bookings.services";

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

const getBooking = async(req: Request, res: Response)=>{
    try {
        const result = await bookingServices.getBooking();

        if(!result.rows.length){
            res.status(404).json({
                success: false,
                message: "No Booking Found"
            })
        } else{
            res.status(200).json({
                success: true,
                message: "Bookings retrieved successfully",
                data: result.rows
            })
        }
    } catch (error:any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const updateBooking = async(req:Request, res: Response)=>{
  const {status} = req.body;
  const bookingId = Number(req.params.bookingId);
  try {
    const result = await bookingServices.updateBooking(status, bookingId);

    res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
      data: result.rows[0]
    })
  } catch (error:any) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const bookingController = {
  createBooking,
  getBooking,
  updateBooking
};
