import express from "express";
import { liveMedia, fileMedia, searchMedia } from "../controllers/media.js";

const router = express.Router();

router.get("/", liveMedia);

router.get("/file", fileMedia);

router.post("/search", searchMedia);

export default router;
