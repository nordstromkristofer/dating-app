const jwt = require ('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require ('./userModel')

const protect = asyncHandler(async (req, res, next) => {
    let token

    if(
    req.headers.authorization && 
    req.headers.authorization.startsWith('Bearer')
    ){
        try{
            // Token från header
            token = req.headers.authorization.split(' ')[1]

            //verifiera token
            const decoded = jwt.verify(token, process.env.JWT_HEMLIS)

            //Användare från token
            req.user = await User.findById(decoded.id).select('-password')

            next()
            } catch (error) {
                console.log(error)
                res.status(401)
                throw new Error('Ej auktoriserad')
            }
        }

        if(!token) {
        res.status(401)
        throw new Error('Ej auktoriserad, ingen token')
    }
})

module.exports = { protect }
