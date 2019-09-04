
const express = require("express");
const app = express();
const port = 5000;
var data = require("./src/assets/graph_data.json");

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/data", (req, res) => res.send(data));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
