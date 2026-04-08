const Profile = require("../models/profileSchema");



const profileController = async (req, res) => {
    
    const { employeeName, employeeEmail, employeeAge, employeeBloodGroup, employeeMaritalStatus, employeeNumber, employeeGender, employeeDoB } = req.body
    try {
        // homework
        const existingProfile = await Profile.findOne({ employeeEmail: employeeEmail });
        if (existingProfile) {
            return res.status(409).json({success: false, message: 'Profile already exists...'
            })
        };
        const profile = new Profile({
            employeeName,
            employeeEmail,
            employeeAge,
            employeeBloodGroup,
            employeeMaritalStatus,
            employeeNumber,
            employeeGender,
            employeeDoB
        }).save()
        res.status(201).json({ success: true, message: "Employee Profile Created..." });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Server Error...' });
    }
    
}

module.exports = profileController;
