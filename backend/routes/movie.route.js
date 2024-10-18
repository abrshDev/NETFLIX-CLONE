import express from "express";
import {
  getmoviedetails,
  getmoviesbycategory,
  getsimilarmovies,
  gettrailermovie,
  gettrendingmovie,
} from "../controllers/movie.controller.js";

const router = express.Router();
router.get("/trending", gettrendingmovie);
router.get("/:id/trailers", gettrailermovie);
router.get("/:id/details", getmoviedetails);
router.get("/:id/similar", getsimilarmovies);
router.get("/:category", getmoviesbycategory);
export default router;
