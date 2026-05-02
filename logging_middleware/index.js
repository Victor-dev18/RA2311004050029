const express = require("express");
const Log = require("./logger");

const app = express();
app.use(express.json());

app.get("/", async (req, res) => {
  await Log("backend", "info", "route", "Root API hit");
  res.send("OK");
});

app.get("/fail", async (req, res) => {
  await Log("backend", "error", "handler", "Failure route triggered");
  res.status(500).send("Error");
});

app.listen(3000, () => console.log("Running"));