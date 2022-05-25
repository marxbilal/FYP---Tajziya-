import express from "express";
import { liveMedia, fileMedia, searchMedia } from "../controllers/media.js";

const router = express.Router();

router.post("/", liveMedia);

router.post("/file", fileMedia);

router.post("/search", searchMedia);

export default router;
