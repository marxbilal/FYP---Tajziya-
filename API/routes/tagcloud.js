import express from "express";
import { liveCloud, fileCloud, searchCloud } from "../controllers/tagcloud.js";

const router = express.Router();

router.post("/", liveCloud);

router.post("/file", fileCloud);

router.post("/search", searchCloud);

export default router;
