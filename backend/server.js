const express = require("express");
const cors = require("cors");
require("dotenv").config();
const userRouter = require("./routes/user");
const adminRouter = require("./routes/admin");
const path = require("path");

// app
const app = express();

// middlewares
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// routes
app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);

// connect and listen
app.listen(process.env.PORT, () => {
  console.log("listening on port", process.env.PORT);
});
