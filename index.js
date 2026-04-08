require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const dbConnection = require('./src/config/dbConnection')

const { registrationController, loginController } = require('./src/controllers/authController')

const app = express()

app.use(express.json())

// database connection...
dbConnection();

// routes...
app.post('/api/auth/registration', registrationController);
app.post('/api/auth/login', loginController );

// test on port environment...
console.log(process.env.PORT);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server Running on port ${port}`);

});


