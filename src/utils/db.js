import { connect } from "mongoose";

export const connectDB = async () => {
  try {
    await connect(process.env.MONGO_DB);
    console.log("Connected to MongoDB...");
  } catch (error) {
    console.log(error);
  }
};
