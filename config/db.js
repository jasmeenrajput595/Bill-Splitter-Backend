import mongoose from "mongoose";

const connectDB = () => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("connected mongodb");
  } catch (error) {
    console.log("mongoDB error:", error);
  }
};
export default connectDB;
