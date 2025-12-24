import { QueryResult } from "pg";
import { pool } from "../../config/db";

type createBookingPayload = {
  customer_id: number;
  vehicle_id: number;
  rent_start_date: string;
  rent_end_date: string;
};

const createBooking = async (payload: createBookingPayload) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;
  const result = await pool.query(
    `WITH inserted AS(
    INSERT INTO bookings(
            customer_id,
            vehicle_id,
            rent_start_date,
            rent_end_date,
            total_price,
            status)
            SELECT
            u.id,
            v.id,
            $3::date,
            $4::date,
            CASE
                WHEN $4::date <= $3::date THEN v.daily_rent_price
                ELSE ($4::date - $3::date) * v.daily_rent_price
            END,
            'active'
            
            FROM users u 
            JOIN vehicles v ON v.id=$2
            WHERE u.id=$1
             RETURNING *)

             SELECT
             i.id,
             i.customer_id,
            i.vehicle_id,
            i.rent_start_date:: text AS rent_start_date,
            i.rent_end_date:: text AS rent_end_date,
            i.total_price,
            i.status,

            json_build_object(
            'vehicle_name', v.vehicle_name,
             'daily_rent_price', v.daily_rent_price) AS vehicle

            FROM inserted i
            JOIN vehicles v ON v.id = i.vehicle_id
    `,
    [customer_id, vehicle_id, rent_start_date, rent_end_date]
  );

  return result;
};

const getBooking = async()=>{
    const result = await pool.query(`SELECT * FROM bookings`);

    return result;
}

const updateBookingAsAdmin = async(bookingId:number): Promise<QueryResult<any>>=>{
  const result = await pool.query(`WITH updated_booking AS (
        UPDATE bookings
        SET status = 'returned', updated_at = NOW()
        WHERE id = $1
          AND status IN ('active')
        RETURNING
          id,
          customer_id,
          vehicle_id,
          rent_start_date::text AS rent_start_date,
          rent_end_date::text  AS rent_end_date,
          total_price,
          status
      ),
      updated_vehicle AS (
        UPDATE vehicles v
        SET availability_status = 'available', updated_at = NOW()
        FROM updated_booking b
        WHERE v.id = b.vehicle_id
        RETURNING v.availability_status
      )
      SELECT
        b.*,
        json_build_object('availability_status', uv.availability_status) AS vehicle
      FROM updated_booking b
      JOIN updated_vehicle uv ON true;`, [bookingId]);



  return result;
}

const cancelBookingAsCustomer = async(customerId:number, bookingId:number): Promise<QueryResult<any>>=>{
  const result = await pool.query(`UPDATE bookings
      SET status = 'cancelled', updated_at = NOW()
      WHERE id = $1
        AND customer_id = $2
        AND status IN ('active', 'pending')
      RETURNING
        id,
        customer_id,
        vehicle_id,
        rent_start_date::text AS rent_start_date,
        rent_end_date::text  AS rent_end_date,
        total_price,
        status;`, [bookingId, customerId]
  );

  return result;
};

export const bookingServices = {
  createBooking,
  getBooking,
  updateBookingAsAdmin,
  cancelBookingAsCustomer
};
