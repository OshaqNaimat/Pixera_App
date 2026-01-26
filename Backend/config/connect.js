import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL || "mongodb://127.0.0.1:27017/pixela");
    console.log(`Database connected on host: ${conn.connection.host}`);
  } catch (error) {
    console.error("Database connection error:", error.message);
    throw error;
  }
};
