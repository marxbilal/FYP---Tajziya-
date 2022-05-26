import { pythonScript } from "./pythonscript.js";

export const liveCloud = async (req, res) => {
    try {
        let largeDataset = await pythonScript("./python/word_cloud.py", "nofile", "");
        res.status(200).json(largeDataset);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
};

export const fileCloud = async (req, res) => {
    try {
        let largeDataset = await pythonScript("./python/word_cloud.py", "file", "");
        res.status(200).json(largeDataset);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
};

export const searchCloud = async (req, res) => {
    try {
        let keyword = req.body.keyword;
        let largeDataset = await pythonScript("./python/word_cloud.py", "search", keyword);
        res.status(200).json(largeDataset);
    } catch (err) {
        console.log("Error in search");
        console.log(err);
    }
};
