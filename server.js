const express = require('express');
const fs = require('fs');
// add routes file 
const routes = require('./routes');
const app = express();
const db = require('./db/db.json');


const PORT = process.env.PORT || 3001;


app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(routes);//


 //app.get('/api/notes', (req, res) => {
 //    fs.readFile('db/db.json', 'utf8', (err, notes) => {
 //        if (err) {
 //          return res.status(500).json({ err });
 //        }
 //        res.json(JSON.parse(notes));
 //    });
 //  });


//   app.post('/api/notes', (req, res) => {
//   const { title, text, id } = req.body;
//   if (title && text && id ) {
//     fs.readFile('db/db.json', 'utf8', (err, notes) => {
//       if (err) {
//         return res.status(500).json({ err });
//       }
//       const data = JSON.parse(notes);
//       data.push ({
//         id,
//         title,
//         text
//       })
//   fs.writeFile('db/db.json', JSON.stringify(data, null, 2), (err) =>{
//     if (err) {
//       return res.status(500).json({ err });
//     }
//   res.json({ id, title, text });
//   });
  
//   });
  
//   } else {
//     res.status(500).json({ error: "title and text are required" });
//   }
  
//   });
  
  app.listen(PORT, () => console.log(`Server listening on PORT http://localhost:${PORT}`));