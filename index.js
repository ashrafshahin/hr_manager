require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const dbConnection = require('./src/config/dbConnection')

const { registrationController, loginController, logoutController } = require('./src/controllers/authController');
const { createProfileController, getProfileController, getSingleProfile, updateProfile, replaceProfile } = require('./src/controllers/profileController');

const app = express()

app.use(express.json())

// database connection...
dbConnection();

// Auth routes...
app.post('/api/auth/registration', registrationController);
app.post('/api/auth/login', loginController);
app.post('/api/auth/logout', logoutController);

// Profile Routes
app.post('/api/profile/profilecreate', createProfileController);

app.get('/api/profile/getprofile', getProfileController);
app.get('/api/profile/getsingleprofile/:id', getSingleProfile);

app.post('/api/profile/updateprofile/:id', updateProfile);
app.put('/api/profile/replaceprofile/:id', replaceProfile);




// test on port environment...
console.log(process.env.PORT);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server Running on port ${port}`);

});


