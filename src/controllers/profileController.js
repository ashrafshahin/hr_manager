const Profile = require("../models/profileSchema");



const createProfileController = async (req, res) => {
    
    const { employeeName, employeeEmail, employeeAge, employeeBloodGroup, employeeMaritalStatus, employeeNumber, employeeGender, employeeDoB, employeeDesignation } = req.body
    
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
    
};

const getSingleProfile = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await Profile.findOne({ _id: id });
        if (data) {
            res.status(200).json({
                message: `${data.employeeName},${data.employeeAge} Profile`,
                data: data,
                success: true
            });
        } else {
            res.status(400).json({ success: false, message: 'Data not Found...' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error...' });
    }

};

const updateProfile = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await Profile.findByIdAndUpdate({ _id: id }, req.body, { new: true });
        if (data) {
            res.status(200).json({ message: `${data.employeeName} Profile Updated...`, data: data, success: true });
        } else {
            res.status(400).json({ success: false, message: "Profile update failed..." });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error..." });
    }
};

const replaceProfile = async (req, res) => {
    const { id } = req.params;
    try {
        const existingProfile = await Profile.findById(id);
        console.log("existing profile:", existingProfile);
        console.log("employeeId:", existingProfile.employeeId);
        if (!existingProfile) {
            return res.status(404).json({ success: false, message: "Profile not found..." });
        }
        
        const data = await Profile.findOneAndReplace(
            { _id: id },
            { ...req.body, employeeId: existingProfile.employeeId },
            { returnDocument: "after", runValidators: true },
        );
        
        return res.status(200).json({
            message: `${data.employeeName} Profile Information Replaced...`,
            data: data,
            success: true
        });
        
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({ success: false, message: "Server error..." });
    }
};

// Profile hold korar jonno .... Use hobe...//
const holdProfile = async (req, res) => {
    const { id } = req.params;
    try {
        const existingUser = await Profile.findOne({ _id: id });
        existingUser.isHold = true
        existingUser.save()
        res.status(200).json({ success: true, message: 'Profile Hold kora hoise...' });
        
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error..." });
    }
    
}

// activate profile... //
const activateProfile = async (req, res) => {
    const { id } = req.params;
    try {
        const existingUser = await Profile.findOne({ _id: id });
        existingUser.isHold = false
        existingUser.save()
        res.status(200).json({ success: true, message: 'Profile Activate kora hoise...' });

    } catch (error) {
        res.status(500).json({ success: false, message: "Server error..." });
    }
}
// Active Profile SHOW korbe.. //
const activeProfiles = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await Profile.find({ isHold: { $ne: true } });
        // const data = await Profile.find({ isHold: false}); // another way...
        res.status(200).json({ message: "All Active Employees Profiles...", data: data, success: true });

    } catch (error) {
        res.status(500).json({ success: false, message: "Server error..." });
    }
};

// Hold Profile SHOW korbe.. //
const holdProfiles = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await Profile.find({ isHold: { $ne: false } });
        // const data = await Profile.find({ isHold: true }); // another way...
        res.status(200).json({ message: "All Hold Employees Profiles...", data: data, success: true });

    } catch (error) {
        res.status(500).json({ success: false, message: "Server error..." });
    }
};

const deleteProfile = async (req,res) => {
    const { id } = req.params;
    try {
        const data = await Profile.findByIdAndDelete({ _id: id });
        res.status(200).json({ success: true, message: "Profile deleted..." });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error..." });
    }
}

module.exports = { createProfileController, getProfileController, getSingleProfile, updateProfile, replaceProfile, holdProfile, activateProfile, activeProfiles, holdProfiles, deleteProfile  } ;
