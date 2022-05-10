import express from "express";
import path from "path";
import { spawn } from "child_process";

const router = express.Router();

const pythonScript = async () => {
    let success = false;
    let path = ["./python/tagcloud.py"];
    const python = spawn("python", path);

    python.stdout.on("data", function (data) {
        success = data;
    });

    return new Promise((resolve, reject) => {
        python.on("error", (err) => {
            console.log(err);
            reject({ err }.json());
        });

        python.on("close", (code) => {
            resolve(success);
        });
    });
};

router.get("/", async (req, res) => {
    let result = await pythonScript();
    if (result) {
        let __dirname = path.resolve();
        res.sendFile(__dirname + "/data/tagcloud.png");
    } else {
        res.status(500).send({ error: "error creating tag cloud" });
    }
});

export default router;
