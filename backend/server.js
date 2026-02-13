const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/users", (req, res) => {
  const data = JSON.parse(fs.readFileSync("./data.json"));
  res.json(data.users);
});

app.get("/sections", (req, res) => {
  const data = JSON.parse(fs.readFileSync("./data.json"));
  res.json(data.sections);
});

app.put("/sections/:id", (req, res) => {
  const data = JSON.parse(fs.readFileSync("./data.json"));
  const section = data.sections.find(s => s.id === req.params.id);

  section.formData = req.body;

  fs.writeFileSync("./data.json", JSON.stringify(data, null, 2));
  res.json(section);
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
