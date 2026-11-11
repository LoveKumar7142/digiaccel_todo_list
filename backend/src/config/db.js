import mongoose from "mongoose";

export const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI);
  console.log("Database connected Successfully");
  console.log(`Host : ${conn.connection.host}`);
};
