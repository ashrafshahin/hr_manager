const Profile = require("../models/profileSchema");



const profileController = async (req, res) => {
    
    const { employeeId, employeeName, employeeEmail, employeeAge, employeeBloodGroup, employeeMaritalStatus, employeeNumber, employeeGender, employeeDoB, employeeDesignation  } = req.body
    
    

    try {
        
        // employeeId creator
        const firstThreeLetter = employeeName.slice(0, 3);
        const randomNumber = Date.now().toString()
        const dob = employeeDoB.slice(0, 2)
        const number = Math.floor(10 + Math.random() * 99);
        const employeeId = 'EMP-' + firstThreeLetter + randomNumber.slice(-3) + 'Z&S' + number + dob
        
    
        // homework 1
        // const existingId = await Profile.findOne({ employeeId });
        // if (existingId) {
        //     return res.status(409).json({
        //         success: false, message: 'Employee Identified, already exists...'
        //     })
        // };
        const existingProfile = await Profile.findOne({ employeeEmail: employeeEmail });
        if (existingProfile) {
            return res.status(409).json({success: false, message: 'Profile already exists...'
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
    
}

module.exports = profileController;
