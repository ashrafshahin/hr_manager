const User = require("../models/userSchema")

const registrationController = async (req, res) => {
    const { username, email, password } = req.body
    // Check existing user ...
    try {
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Email already exists...' })
        };
        // Creating new users...
        const createUser = new User({
            username: username,
            email: email,
            password: password,
        })
        // .save() bracket er por o deya jai..
        createUser.save();
        res.send({
            id: createUser._id,
            username: createUser.username,
            email: createUser.email,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Server Error...' })
        
    };

    
}

module.exports = { registrationController }

//note:
// সংক্ষেপে বলি 👉 না, এক request-এ দুইটা res.send() ব্যবহার করা যায় না ❌