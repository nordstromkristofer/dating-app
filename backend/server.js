const express = require ('express');
const colors = require('colors');
const dotenv = require('dotenv');

const connectDB = require('./db')
const port = process.env.PORT || 5000;

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

// app.use('/api/users', require('./routes/userRoutes'))



app.listen(port, () => console.log(`'Server startad på port ${port}`))