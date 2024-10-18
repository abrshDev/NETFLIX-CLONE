import express from "express";
import {
  deletesearchhistory,
  getsearchhistory,
  moviesearch,
  personsearch,
  tvsearch,
} from "../controllers/search.controller.js";

const router = express.Router();

router.get("/person/:query", personsearch);
router.get("/movie/:query", moviesearch);
router.get("/tv/:query", tvsearch);
router.get("/history", getsearchhistory);
router.delete("/history/:id", deletesearchhistory);
export default router;
