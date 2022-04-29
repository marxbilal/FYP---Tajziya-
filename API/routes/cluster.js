import express from "express";
import fileupload from "express-fileupload"
import cors from "cors"

import {liveCluster, fileCluster} from '../controllers/cluster.js'

const router = express.Router();

router.use('/file',fileupload())

router.use('/file',cors())

router.post("/", liveCluster);

router.post("/file",fileCluster);

export default router;
