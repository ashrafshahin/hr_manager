const User = require("../models/userSchema")

const registrationController = (req, res) => {
    const { username, email, password } = req.body
    // res.send('Assalamu Alikum, HR Management Project Testing...')
    
    // Creating new users...
    const createUser = new User({
        username: username,
        email: email,
        password: password,
    })
    // .save() bracket er por o deya jai..
    createUser.save();
    res.send(createUser);
}

module.exports = { registrationController }

//note:
// সংক্ষেপে বলি 👉 না, এক request-এ দুইটা res.send() ব্যবহার করা যায় না ❌