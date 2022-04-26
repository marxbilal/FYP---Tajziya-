import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import userRoute from "./routes/user.js";
import clusterRoute from "./routes/cluster.js";
import adminRoute from "./routes/admin.js";
import path from "./config/path.js";

const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use("/user", userRoute);
app.use("/cluster", clusterRoute);
app.use("/admin", adminRoute);

mongoose.connect(path.url, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.listen(port, () => {
  console.log(`listening on port http://localhost:${port}`);
});
