import express from "express";
import cookieParser from "cookie-parser";

import authroutes from "./routes/auth.route.js";
import movieroutes from "./routes/movie.route.js";
import tvroutes from "./routes/tv.route.js";
import searchroutes from "./routes/search.route.js";

import { ENV_VARS } from "./config/envVars.js";
import { connectdb } from "./config/db.js";
import { verifytoken } from "./middleware/verifytoken.js";

const app = express();
const PORT = ENV_VARS.PORT;

app.use(cookieParser());
app.use(express.json());

app.use("/api/v1/auth", authroutes);
app.use("/api/v1/movie", verifytoken, movieroutes);
app.use("/api/v1/tv", verifytoken, tvroutes);
app.use("/api/v1/search", verifytoken, searchroutes);

app.listen(PORT, () => {
  console.log("Server is running on port: ", PORT);
  connectdb();
});
