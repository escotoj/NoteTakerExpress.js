const router = require('express').Router();
// const path = require('path');
const fs = require('fs');


router.get('/api/notes', (req, res) => {
    fs.readFile('Develop/db/db.json', 'utf8', (err, notes) => {
        if (err) {
          return res.status(500).json({ err });
        }
        res.json(JSON.parse(notes));
    });
  });
  // path.join(__dirname, '..', 'db', 'db.json')


  router.post('/api/notes', (req, res) => {
  const { title, text, id } = req.body;
  if (title && text && id ) {
    fs.readFile('Develop/db/db.json', 'utf8', (err, notes) => {
      if (err) {
        return res.status(500).json({ err });
      }
      const data = JSON.parse(notes);
      data.push ({
        id,
        title,
        text
      })
  fs.writeFile('Develop/db/db.json', JSON.stringify(data, null, 2), (err) =>{
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


module.exports = router;