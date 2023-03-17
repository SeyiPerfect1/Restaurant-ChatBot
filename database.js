import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URL;

// connect to mongodb
export const connectToMongoDB = () => {
  mongoose.connect(MONGODB_URI);

  mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB successfully');
  });

  mongoose.connection.on('error', (err) => {
    console.log('Error connecting to MongoDB', err);
  });
}

