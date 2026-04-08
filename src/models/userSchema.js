const { type } = require('express/lib/response')
const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "Username is required..."]
    },
    email: {
        type: String,
        required: [true, "Email is required..."],
        trim: true,
        lowercase: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: [true, "Password is required..."],
        min: [8, 'minimum 8 digit required...'],
        max: [14, 'You exceeded maximum limit...'],
        // match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,14}$/, 'Please fill a valid Password...']
    },
    photo:{
        type: String
    },
    nid: {
        type: Number,
        min: [10, 'Smart card - minimum 10 digit required...'],
        max: [17, 'Un-Smart card - maximum 17 digit required...']
    },
    address: {
        type: String,
    }
     
})

module.exports = mongoose.model('User', userSchema);

// model hobe its a controllers, schema is a blueprint. x mongoose.schema x √ mongoose.model √