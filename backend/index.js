const express = require("express");
require("dotenv").config();
const cors = require("cors");
const projectRoutes = require("./routes/projectRoute");
const userRoutes = require("./routes/userRoutes");
const mongoose = require("mongoose");

const port = process.env.PORT || 8000;

const app = express();

// middleware
app.use((req, res, next) => {
  console.log(req.url, req.method);
  next();
});

app.use(cors());
app.use(express.json());
app.use("/api/projects", projectRoutes);
app.use("/api/user", userRoutes);

// connect momgo
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(" Connect Mongo and Server is running on port", port);
    });
  })
  .catch((err) => console.log(err));
