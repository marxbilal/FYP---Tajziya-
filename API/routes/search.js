import express from "express";
import { pythonScript } from "../controllers/pythonscript.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        let keyword = req.body.keyword;
        let largeDataset = await pythonScript("./python/search.py", keyword, "");
        res.status(200).json(largeDataset);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

export default router;
