const express = require("express");
const app = express();
require("dotenv").config();
require("./conn/conn");
const cors = require("cors");
const UserAPI = require("./routes/user");
const TaskAPI = require("./routes/task");

app.use(cors());
app.use(express.json());

// /api/v1/signin
app.use("/api/v1", UserAPI);
app.use("/api/v1", TaskAPI);
// app.use("/", (req, res) => {
//   res.send("hello from backend side");
// });

const PORT = 1000;
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
