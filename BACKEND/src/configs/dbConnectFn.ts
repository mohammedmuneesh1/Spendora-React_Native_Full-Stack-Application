

import {neon} from "@neondatabase/serverless"
import logger from "../libs/winstonLogger";


//CREATE A SQL CONNECTYION USING OUR DB URL
export const sql = neon(process.env.DB_URL as string);


const connectDBFn = async (): Promise<void> => {
   try {
      // await sql `SELECT 1`;
      await sql `CREATE TABLE IF NOT EXISTS transactions(
         id SERIAL PRIMARY KEY,
         userd_id VARCHAR(225) NOT NULL,
         title VARCHAR(200) NOT NULL,
         amount DECIMAL(10,2) NOT NULL,
         type VARCHAR(100) NOT NULL DEFAULT 'expense',
         category VARCHAR(100) NOT NULL,
         created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      )`;

      // await sql `ALTER TABLE transactions 
      // ADD COLUMN IF NOT EXISTS type VARCHAR(100) NOT NULL DEFAULT 'expense'`;



      //comment section 
      // DECIMAL (10,2)  means  a fixed point number with : 10 digit total and 2 digits after the deimcal point 
      // so: the max value it can store is 99999999.99  ( 8 digits before the decimal point and 2 digits after the decimal point)

//       10 total digits
// - 2 decimal digits
// = 8 digits before the decimal


      logger.info("Connected to DB successfully.");
   } catch (error) {
      logger.error(`Failed to connect to DB: ${error instanceof Error ? error.message : error}`);
      process.exit(1);   // STATUS CODE 1 MEANS FAILURE, 0 SUCCESS
   }
}

export default connectDBFn;





// // src/config/mongooseConnect.ts

// import mongoose from "mongoose";
// import logger from "../libs/winstonLogger";

// const connectDBFn = async (): Promise<void> => {
//   const dbUrl = process.env.DB_URL;

//   if (!dbUrl) {
//     logger.error("DB_URL is not defined in environment variables.");
//     process.exit(1);
//   }

//   try {
// await mongoose.connect(dbUrl, {
//   autoIndex: false,         // Disable auto-creation of indexes in production
//   serverSelectionTimeoutMS: 5000, // Fail fast if server not found
//   socketTimeoutMS: 45000,   // Close sockets after 45s of inactivity
// });
//     logger.info("Connected to DB successfully.");
//   } catch (error) {
//     logger.error(
//       `Failed to connect to DB: ${error instanceof Error ? error.message : error}`
//     );
//     process.exit(1); // Ensure app exits if DB fails to connect
//   }
// };

// export default connectDBFn;
