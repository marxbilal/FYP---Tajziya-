import { spawn } from "child_process";
import path from 'path';
import { fileURLToPath } from 'url';

export const liveCluster = (req, res) => {
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
  }

export const fileCluster = (req,res) =>{
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const file = req.files.file;
    const filename = file.name;
    const newpath = path.join(__dirname,'..', "data",filename);
    console.log(newpath)
    
    
   
    file.mv(`${newpath}`, (err) => {
      if (err) {
        res.status(500).send({ message: "File upload failed", code: 200 });
      }
      res.status(200).send({ message: "File Uploaded", code: 200 });
    });
}