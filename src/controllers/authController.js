const User = require("../models/userSchema")
const bcrypt = require('bcrypt')

const registrationController = async (req, res) => {
    const { username, email, password } = req.body
    // Check existing user ...
    try {
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Email already exists...'
            })
        };

        // password rejex problem solved...
        const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,14}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).send({
                message: "Please fill a valid Password..."
            });
        }
        const hashPassword = bcrypt.hashSync(password, 10);
        console.log(hashPassword);
        
        // Creating new users...
        const createUser = await new User({
            username: username,
            email: email,
            password: hashPassword
        }).save();

        try {
            res.status(201).json({
                id: createUser._id,
                username: createUser.username,
                email: createUser.email,
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Something went wrong..."
            })
        }
        
       
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Server Error...' })

    };


}

module.exports = { registrationController }

//note:
// সংক্ষেপে বলি 👉 না, এক request-এ দুইটা res.send() ব্যবহার করা যায় না ❌