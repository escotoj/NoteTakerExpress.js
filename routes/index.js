const router = require("express").Router();
const path = require('path');
const fs = require("fs");
const {v4: uuidv4 } = require("uuid");
const db = require('../db/db.json')

router.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/notes.html"));
});

router.get("/api/notes", (req, res) => {
  fs.readFile("db/db.json", "utf8", (err, notes) => {
    if (err) {
      return res.status(500).json({ err });
    }
    res.json(JSON.parse(notes));
  });
});
// path.join(__dirname, '..', 'db', 'db.json')

router.post("/api/notes", (req, res) => {
  const { title, text } = req.body;
  const id = uuidv4();
  if (title && text && id) {
    fs.readFile("db/db.json", "utf8", (err, notes) => {
      if (err) {
        return res.status(500).json({ err });
      }
      const data = JSON.parse(notes);
      data.push({
        id,
        title,
        text,
      });
      fs.writeFile("db/db.json", JSON.stringify(data, null, 2), (err) => {
        if (err) {
          return res.status(500).json({ err });
        }
        res.json({ id, title, text });
      });
    });
  } else {
    res.status(500).json({ error: "title and text are required" });
  }
});

router.delete("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  console.log(id)
  for(let i = 0; i < db.length; i++) {
    if(db[i].id === id) {
      db.splice(i, 1)
      fs.writeFileSync("db/db.json",JSON.stringify(db, null, 2))
    }
    break;
  }
  res.json(true)
});

module.exports = router;
