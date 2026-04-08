const User = require("../models/userSchema")
const bcrypt = require('bcrypt')

const registrationController = async (req, res) => {
    const { username, email, password } = req.body
    // Check existing user ...
    try {
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(409).json({
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


};

const loginController = async (req, res) => {
    const { email, password } = req.body
    try {
        const existingUser = await User.findOne({ email: email })
        
        // One device login system...1
        if (existingUser.isLogin) {
            return res.status(400).json({
                success: false,
                message: "Please logOut from another device...",
            })
        };
        
        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: "User/email not found. Please register first...",
            })
        };

        const pass = bcrypt.compareSync(password, existingUser.password);
        
        // One device login system...2
        existingUser.isLogin = true
        existingUser.save()

        if (pass) {
            res.status(200).json({
                success: true,
                message: "Loging successful..."
            })
        } else {
            res.status(400).json({
                success: false,
                message: "Invalid Credential..."
            })
        };

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error..."
        })
    }
    

};

const logoutController = async (req, res) => {
    const { id } = req.body;
    const existingUser = await User.findOne({ _id: id });
    existingUser.isLogin = false;
    existingUser.save() // database e save kore √.√.Important
    res.status(200).json({
        success: true,
        message: "Log Out Successully..."
    });
};

module.exports = { registrationController, loginController , logoutController }

//note:
// সংক্ষেপে বলি 👉 না, এক request-এ দুইটা res.send() ব্যবহার করা যায় না ❌

// compare korar time user er password sathe database password compare hobe...

// islogin- 3 jaigai + logout astese...
// schema te FALSE, bcrypt e TRUE , 
// login er niche another device logout message...