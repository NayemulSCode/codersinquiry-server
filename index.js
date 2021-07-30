const express = require('express');
require('dotenv').config();
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;

// middleware
const app = express()
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Hello World!, We are code hunter!')
})


const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));