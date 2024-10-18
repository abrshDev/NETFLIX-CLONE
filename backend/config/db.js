import mongoose from "mongoose";
import { ENV_VARS } from "./envVars.js";

export const connectdb = async () => {
  try {
    const conn = await mongoose.connect(ENV_VARS.MONGO_URI);
    console.log("connected", conn.connection.host);
  } catch (error) {
    console.log("error connecting ", error.message);
    process.exit(1); //there was an error
  }
};
