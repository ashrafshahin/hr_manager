// const bcrypt = require('bcryptjs');

// const hashPassword = async (req, res, next) => {
//     try {
//         const { password } = req.body;
//         if (!password) return res.status(400).json({
//             success: false,
//             message: 'Password is required...'
//         })
//         const salt = await bcrypt.genSalt(10)
//         req.body.password = await bcrypt.hash(password, salt); // buji nai

//         next(); //  move to controller
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "server error"
//         })
//     }
// }

// module.exports = hashPassword