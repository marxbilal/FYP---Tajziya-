import express from "express";
import { spawn } from "child_process";

const router = express.Router();

router.post("/", (req, res) => {
  if (req.body.filterCategory == null && req.body.filterTopic == null) {
    let largeDataset = [];

    const python = spawn("python", ["./python/cluster.py"]);
    python.stdout.on("data", function (data) {
      console.log("Pipe data from python script ...");
      largeDataset.push(data);
    });

    python.on("close", (code) => {
      console.log(`child process close all stdio with code ${code}`);
      largeDataset = largeDataset.join("");
      // largeDataset = largeDataset.substring(0, largeDataset.length - 2);
      largeDataset = JSON.parse(largeDataset);
      res.status(200).json(largeDataset);
    });
  } else {
  }
});

export default router;
