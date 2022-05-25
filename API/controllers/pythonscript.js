import { spawn } from "child_process";

export const pythonScript = async (script, filter, key) => {
    let error = false;
    let largeDataset = [];
    let arg = [script, filter, key];
    const python = spawn("python", arg);

    python.stdout.on("data", function (data) {
        largeDataset.push(data);
    });

    return new Promise((resolve, reject) => {
        python.on("close", (code) => {
            try {
                largeDataset = largeDataset.join("");
                largeDataset = JSON.parse(largeDataset);
                if (largeDataset.error) {
                    reject(largeDataset);
                } else {
                    resolve(largeDataset);
                }
            } catch (err) {
                largeDataset = { error: err.toString() };
                reject(largeDataset);
            }
        });
    });
};
