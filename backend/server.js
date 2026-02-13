const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/sections", (req, res) => {
  const data = JSON.parse(fs.readFileSync("./data.json"));
  res.json(data.sections);
});


app.listen(3001, () => {
  console.log("Server running on port 3001");
});
