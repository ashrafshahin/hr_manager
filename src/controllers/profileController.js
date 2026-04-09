const Profile = require("../models/profileSchema");



const createProfileController = async (req, res) => {
    
    const { employeeId, employeeName, employeeEmail, employeeAge, employeeBloodGroup, employeeMaritalStatus, employeeNumber, employeeGender, employeeDoB, employeeDesignation } = req.body
    
    try {
        
        // employeeId creator
        const firstThreeLetter = employeeName.slice(0, 3);
        const randomNumber = Date.now().toString()
        const dob = employeeDoB.slice(0, 2)
        const number = Math.floor(10 + Math.random() * 99);
        const employeeId = 'EMP-' + firstThreeLetter + randomNumber.slice(-3) + 'Z&S' + number + dob
        // homework 1
        
        const existingProfile = await Profile.findOne({ employeeEmail: employeeEmail });
        if (existingProfile) {
            return res.status(409).json({
                success: false, message: 'Profile already exists...'
            })
        };
        
        const profile = await new Profile({
            employeeId,
            employeeName,
            employeeEmail,
            employeeAge,
            employeeBloodGroup,
            employeeDesignation,
            employeeMaritalStatus,
            employeeNumber,
            employeeGender,
            employeeDoB,
            
        }).save()
        res.status(201).json({ success: true, message: "Employee Profile Created..." });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Server Error...' });
    }
    
};

const getProfileController = async (req, res) => {
    try {
        const data = await Profile.find({});
        if (data) {
            res.status(200).json({ message: 'All Profiles', data: data, success: true });
        } else {
             res.status(400).json({ success: false, message: 'Data not Found...' });
        }
    } catch (error) {
         res.status(500).json({ success: false, message: 'Server Error...' });
    }
    

}

module.exports = {createProfileController, getProfileController,  } ;
