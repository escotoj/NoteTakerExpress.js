const express = require('express');
const fs = require('fs');

const app = express();


const PORT = process.env.PORT || 3001;


app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));