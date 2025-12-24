import { Pool } from "pg";
import config from ".";

// DB
export const pool = new Pool({
  connectionString: `${config.connection_str}`,
});

// init DB
const initDB = async () => {
  await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,

        name VARCHAR(100) NOT NULL,

        email VARCHAR(150) UNIQUE NOT NULL,
        CHECK (email = LOWER(email)),

        password TEXT NOT NULL,
        CHECK (LENGTH(password) >=6 ),

        phone TEXT NOT NULL,

        role VARCHAR(20) NOT NULL,
        CHECK (role IN ('admin', 'customer')),

        created_at TIMESTAMP DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL
        )`);

  await pool.query(`
            CREATE TABLE IF NOT EXISTS vehicles(
            id SERIAL PRIMARY KEY,

            vehicle_name VARCHAR(200) NOT NULL,

            type TEXT NOT NULL,

            registration_number TEXT UNIQUE NOT NULL,

            daily_rent_price INT NOT NULL,
            CHECK (daily_rent_price > 0),

            availability_status TEXT,
            CHECK(availability_status IN ('available', 'booked')),

            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
            )`);

  await pool.query(`
            CREATE TABLE IF NOT EXISTS bookings(
            id SERIAL PRIMARY KEY,

            customer_id INT REFERENCES users(id) ON DELETE CASCADE NOT NULL,

            vehicle_id INT REFERENCES vehicles(id) ON DELETE CASCADE NOT NULL,

            rent_start_date DATE NOT NULL,

            rent_end_date DATE NOT NULL,
            CHECK (rent_end_date > rent_start_date),

            total_price INT NOT NULL,
            CHECK (total_price > 0),

            status TEXT NOT NULL,
            CHECK (status IN ('active', 'cancelled', 'returned')),

            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
            )
            `);
};

export default initDB;