import dotenv from 'dotenv';


dotenv.config();

const config = {
    port: process.env.PORT,
    connection_str: process.env.CONNECTION_STR,
    jwtSecret: process.env.JWT_Secret
}

export default config;