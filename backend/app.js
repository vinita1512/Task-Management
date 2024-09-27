const express = require("express");
const app = express();
require("dotenv").config();
require("./conn/conn");
const cors = require("cors");
const path = require("path");
const UserAPI = require("./routes/user");
const TaskAPI = require("./routes/task");
const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());

app.use("/api/v1", UserAPI);
app.use("/api/v1", TaskAPI);

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
