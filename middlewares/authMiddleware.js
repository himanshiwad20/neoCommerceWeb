import JWT from 'jsonwebtoken'
import userModel from '../models/userModel.js'

// Protected Route Token based

export const requireSignIn = async (req, res, next) => {
    try {
        const decode = JWT.verify(
            req.headers.authorization, 
            process.env.JWT_SECRET
        )
        req.user=decode
        // console.log("requireSignIn success")
        next()
    } catch (error) {
        console.log(error)
        // res.send('middleware - access denied - first login')
    }
}

export const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id)

        // console.log(user)

        if(user.role !== 1) {
            return res.status(401).send({
                success: false,
                message: 'UnAuthorized Access',
                user
            })
        } else {
            next()
        }
    } catch (error) {
        console.log(error)
        res.status(401).send({
            success: false,
            message: 'Error in middleware isAdmin',
            error
        })
    }
}

export const isUser = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id)

        console.log(user)

        if(user.role !== 0) {
            return res.status(401).send({
                success: false,
                message: 'UnAuthorized Access',
                user
            })
        } else {
            next()
        }
    } catch (error) {
        console.log(error)
        res.status(401).send({
            success: false,
            message: 'Error in middleware isUser',
            error
        })
    }
}