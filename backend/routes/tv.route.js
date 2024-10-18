import express from "express";
import {
  gettvdetails,
  gettvsbycategory,
  getsimilartvs,
  gettrailertv,
  gettrendingtv,
} from "../controllers/tv.controller.js";

const router = express.Router();
router.get("/trending", gettrendingtv);
router.get("/:id/trailers", gettrailertv);
router.get("/:id/details", gettvdetails);
router.get("/:id/similar", getsimilartvs);
router.get("/:category", gettvsbycategory);
export default router;
