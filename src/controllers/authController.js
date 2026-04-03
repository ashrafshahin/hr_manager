
const registrationController = (req, res) => {
    const { username, email, password } = req.body
    console.log(username, email, password);
    res.send({username, email, password})
    
    res.send('Assalamu Alikum, HR Management Project Testing...')
     
}

module.exports = {registrationController}