"use strict";
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
var cors = require("cors");
const UserRoute = require("./routes/user");
app.use(cors());

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/bloodDonationdb", {
  useNewUrlParser: true,
  UseUnifiedTopology: true,
});
const db = mongoose.connection;

db.on("error", (err) => {
  console.log(err);
});

db.once("open", () => {
  console.log("Database connection established");
});

if (process.env.NODE_ENV === "production") {
  // Exprees will serve up production assets
  app.use(express.static("client/build"));

  // Express serve up index.html file if it doesn't recognize route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

app.use("/api/user", UserRoute);
