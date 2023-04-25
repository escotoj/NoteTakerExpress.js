const router = require("express").Router();
// const path = require('path');
const fs = require("fs");
const uuid = require("uuid");

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
  const { title, text, id } = req.body;
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

router.delete("/api/notes/:id", (req, res) => {});

module.exports = router;
