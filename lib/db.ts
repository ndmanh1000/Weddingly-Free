import mongoose from "mongoose";

const connectToDatabase = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI is not configured");
  }

  if (mongoose.connection.readyState >= 1) {
    return;
  }

  await mongoose.connect(uri);
};

export default connectToDatabase;
