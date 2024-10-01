const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();
require("./conn/conn");
const cors = require("cors");
const UserAPI = require("./routes/user");
const TaskAPI = require("./routes/task");
const PORT = process.env.PORT || 1000;
const _dirname = path.resolve();
app.use(cors());
app.use(express.json());

app.use("/api/v1", UserAPI);
app.use("/api/v1", TaskAPI);

app.use(express.static(path.join(_dirname, "/frontend/dist")));
app.get("*", (_, res) => {
  res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
