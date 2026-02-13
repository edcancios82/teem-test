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
  const section = data.sections.find(s => s.id.toString() === req.params.id);

  section.formData = { ...section.formData, ...req.body };

  fs.writeFileSync("./data.json", JSON.stringify(data, null, 2));
  res.json(section);
});

app.put("/sections/:sectionId/update-owners", (req, res) => {
  const data = JSON.parse(fs.readFileSync("./data.json"));
  const section = data.sections.find(s => s.id.toString() === req.params.sectionId);
  const user = data.users.find(u => u.id === req.body.userId);

  if (section && user && !section.owners.includes(user.id)) {
    section.owners.push(user.id);
  }

  fs.writeFileSync("./data.json", JSON.stringify(data, null, 2));
  console.log(`Updated owners for section ${section.id}:`, section.owners);
  res.json(section);
});

app.delete("/sections/clear", (req, res) => {
  const data = JSON.parse(fs.readFileSync("./data.json"));
  data.sections = data.sections.map(section => {
    const cleanedSection = { ...section, owners: [] };
    delete cleanedSection.formData?.field1;
    delete cleanedSection.formData?.field2;

    return cleanedSection;
  })
  fs.writeFileSync("./data.json", JSON.stringify(data, null, 2));
  res.json(data.sections);
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
