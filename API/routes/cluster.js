import express from "express";
import multer from "multer";

import { liveCluster, fileCluster } from "../controllers/cluster.js";

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "data");
    },
    filename: (req, file, cb) => {
        cb(null, "file_unclean_data.csv");
    },
});

const upload = multer({ storage });

router.post("/", liveCluster);

router.post("/file", upload.single("file"), fileCluster);

export default router;
