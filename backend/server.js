import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import authroutes from "./routes/auth.route.js";
import movieroutes from "./routes/movie.route.js";
import tvroutes from "./routes/tv.route.js";
import searchroutes from "./routes/search.route.js";

import { ENV_VARS } from "./config/envVars.js";
import { connectdb } from "./config/db.js";
import { verifytoken } from "./middleware/verifytoken.js";

const app = express();
const PORT = ENV_VARS.PORT;
const __dirname = path.resolve();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Allow only your frontend server to access the backend
    credentials: true, // Include credentials (cookies, authorization headers, etc.) if needed
  })
);

app.use("/api/v1/auth", authroutes);
app.use("/api/v1/movie", verifytoken, movieroutes);
app.use("/api/v1/tv", verifytoken, tvroutes);
app.use("/api/v1/search", verifytoken, searchroutes);

if (ENV_VARS.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log("Server is running on port: ", PORT);
  connectdb();
});
