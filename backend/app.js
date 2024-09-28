const express = require("express");
const app = express();
require("dotenv").config();
require("./conn/conn");
const cors = require("cors");
const UserAPI = require("./routes/user");
const TaskAPI = require("./routes/task");
const PORT = process.env.PORT || 1000;
app.use(cors());
app.use(express.json());

app.use("/api/v1", UserAPI);
app.use("/api/v1", TaskAPI);

module.exports = app;
