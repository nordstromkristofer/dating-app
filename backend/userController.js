const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('./userModel')

//@desc     Registrera ny användare
//@route    POST api/users
//@access   Public
const registerUser = asyncHandler(async (req,res) => {
    const { name, email, password } = req.body

    if(!name || !email || !password){
        res.status(400)
        throw new Error('Lägg till fälten äru snäll')
    }

    //kolla efter befintlig användare
    const userExists = await User.findOne({email})
    
    if(userExists) {
        res.status(400)
        throw new Error('Finns redan')
    }

    //hashat lösenord
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    
    //Skapa användare
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if (user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        })
    } else{
        res.status(400)
        throw new Error('INVALID, jättefel!')
    }
})


//@desc     Autentisering
//@route    POST api/users/login
//@access   Public
const loginUser = asyncHandler(async (req,res) => {
    const {email, password}  = req.body

    //kolla email
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('INVALID!')
    }
})
//@desc     Användarens data
//@route    POST api/users/me
//@access   Private
const getMe = asyncHandler(async (req,res) => {
    res.status(200).json(req.user)
})


// Skapa JWT
const generateToken = (id) => {
    return jwt.sign ({ id }, process.env.JWT_HEMLIS, {
        expiresIn: '30d'       
    })
}







module.exports = {
    registerUser,
    loginUser,
    getMe
}