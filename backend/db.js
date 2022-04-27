const mongoose = require('mongoose');
const { connect } = require('./userRoute');
MONGO_URI = 'mongodb+srv://knord:kluster@kluster1.xx1gc.mongodb.net/projekt?retryWrites=true&w=majority';

const connectDB = async () => {
    try{
    const conn = await mongoose.connect(MONGO_URI)

    console.log(`Kristofers mongoDB connectad! ${conn.connection.host}`.cyan.
    underline);
    } catch (error) {
    console.log(error);
    process.exit(1)
    }
}

module.exports = connectDB