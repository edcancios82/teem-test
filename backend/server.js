const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
