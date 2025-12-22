import { Request, Response, Router } from "express";
import { pool } from "../../config/db";

const router = Router();

// Post Method
router.post('/', async(req: Request, res: Response) =>{
    const {vehicle_name, type, registration_number, daily_rent_price, availability_status} = req.body;

    try {
       const result = await pool.query(`INSERT INTO vehicles(vehicle_name, type, registration_number, daily_rent_price, availability_status) VALUES($1, $2, $3, $4, $5) RETURNING *`, [vehicle_name, type, registration_number, daily_rent_price, availability_status]) 

       res.status(201).json({
        success: true,
        message: "Vehicle created successfully",
        data: result.rows[0]
       })
    } catch (error:any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

export const vehicleRoutes = router;