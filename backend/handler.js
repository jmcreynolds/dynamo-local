const AWS = require("aws-sdk");
const express = require("express");
const serverless = require("serverless-http");
const userRoutes = require("./routes/users.routes");

const app = express();

app.use(express.json());

app.use("/user", userRoutes);

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found on WebSpy",
  });
});

module.exports.handler = serverless(app);
