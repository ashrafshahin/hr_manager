require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const dbConnection = require('./src/config/dbConnection')
const app = express()

app.use(express.json())
dbConnection();

app.get('/', (req, res) => {
    res.send('Assalamu Alikum, HR Management Project Testing...')
});

// test on port environment...
console.log(process.env.PORT);

const port = process.env.PORT || 5000;
app.listen(5000, () => {
    console.log(`Server Running on port ${port}`);

});


