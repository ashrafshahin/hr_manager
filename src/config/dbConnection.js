const mongoose = require('mongoose')

const dbConnection = () => {
    mongoose.connect(process.env.DB_URL).then(() => {
        console.log('MongoDB Database Connected...');

    });
}

module.exports = dbConnection;