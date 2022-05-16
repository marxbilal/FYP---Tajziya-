import { spawn } from "child_process";

const pythonScript = async (file) => {
    let largeDataset = [];
    let path = file ? ["./python/cluster.py", "file", ""] : ["./python/cluster.py", "nofile"];
    const python = spawn("python", path);

    python.stdout.on("data", function (data) {
        largeDataset.push(data);
    });

    return new Promise((resolve, reject) => {
        python.on("error", (err) => {
            console.log(err);
            reject({ err }.json());
        });

        python.on("close", (code) => {
            if (largeDataset.error) {
                largeDataset = { error: "Error in file" };
            } else {
                largeDataset = largeDataset.join("");
                largeDataset = JSON.parse(largeDataset);
            }

            resolve(largeDataset);
        });
    });
};

export const liveCluster = async (req, res) => {
    // if (req.body.filterCategory == null && req.body.filterTopic == null) {
    try {
        let largeDataset = await pythonScript(false);
        res.status(200).json(largeDataset);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
};

export const fileCluster = async (req, res) => {
    try {
        let largeDataset = await pythonScript(true);
        res.status(200).json(largeDataset);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
};
