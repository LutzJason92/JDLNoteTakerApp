const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3001;

//middle ware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/index.html"))
);
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/notes.html"))
);

app.get("/api/notes", (req, res) => {
  fs.readFile("db/db.json", (err, data) => {
    console.log(err);
    console.log(JSON.parse(data));
    res.json(JSON.parse(data));
  });
});

app.post("/api/notes", (req, res) => {
  fs.readFile("db/db.json", (err, data) => {
    console.log(err);
    console.log(JSON.parse(data));

    let notes = JSON.parse(data);

    notes.push(req.body);

    fs.writeFile("db/db.json", JSON.stringify(notes), (err) => {
      console.log(err);
      res.json(req.body);
    });
  });
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
