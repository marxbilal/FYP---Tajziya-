import { pythonScript } from "./pythonscript.js";

export const liveMedia = async (req, res) => {
    try {
        let largeDataset = await pythonScript("./python/media.py", "nofile", "");
        res.status(200).json(largeDataset);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
};

export const fileMedia = async (req, res) => {
    try {
        let largeDataset = await pythonScript("./python/media.py", "file", "");
        res.status(200).json(largeDataset);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
};

export const searchMedia = async (req, res) => {
    try {
        let keyword = req.body.keyword;
        let largeDataset = await pythonScript("./python/media.py", "search", keyword);
        res.status(200).json(largeDataset);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
};
