import { pythonScript } from "./pythonscript.js";

export const liveCluster = async (req, res) => {
    // if (req.body.filterCategory == null && req.body.filterTopic == null) {
    try {
        let largeDataset = await pythonScript("./python/cluster.py", "nofile", "");
        res.status(200).json(largeDataset);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
};

export const fileCluster = async (req, res) => {
    try {
        let largeDataset = await pythonScript("./python/cluster.py", "file", "");
        res.status(200).json(largeDataset);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
};

export const searchCluster = async (req, res) => {
    try {
        let keyword = req.body.keyword;
        let largeDataset = await pythonScript("./python/cluster.py", "search", keyword);
        res.status(200).json(largeDataset);
    } catch (err) {
        res.status(500).json(err);
        console.log("Error in cluster");
        console.log(err);
    }
};
