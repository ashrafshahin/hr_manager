require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const app = express()

app.use(express.json())

mongoose.connect(process.env.DB_URL).then(() => {
    console.log('MongoDB Database Connected...');

});

app.get('/', (req, res) => {
    res.send('Assalamu Alikum, HR Management Project Testing...')
});

// test on port environment...
console.log(process.env.PORT);

const port = process.env.PORT || 5000;
app.listen(5000, () => {
    console.log(`Server Running on port ${port}`);

});


