const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 3000;
const notes = require("./db/db.json");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/index.html"))
);
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/notes.html"))
);
app.get("/api/notes", (req, res) => {
  let data = fs.readFileSync("./db/db.json", "utf-8");
  return res.json(JSON.parse(data));
});
app.post("/api/notes", (req, res) => {
  let data = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"));
  data.push(req.body);
  fs.writeFile("./db/db.json", JSON.stringify(data), (err) => {
    if (err) {
      return err;
    }

    return res.json(req.body);
  });
});
app.listen(PORT, () => console.log("port number: " + PORT));
