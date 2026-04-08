const mongoose = require('mongoose');
const { Schema } = mongoose



const profileSchema = new Schema({
    employeeId: {
        type: String,
        required: true,
    },
    employeeName: {
        type: String,
        required: true,
    },
    employeeEmail: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    employeeDesignation: {
        type: String,
        required: true,
        unique:true,
    },

    employeeAge: {
        type: String,
        required: true,
    },
    employeeBloodGroup: {
        type: String,
        required: true,
    },
    employeeNumber: {
        type: String,
        required: true,
    },
    employeeMaritalStatus: {
        type: String,
        required: true,
    },
    employeeGender: {
        type: String,
        required: true,
        enum: ['male', 'female'],
    },
    employeeDoB: {
        type: String,
        required: true,
    },

});

module.exports = mongoose.model('Profile', profileSchema);
