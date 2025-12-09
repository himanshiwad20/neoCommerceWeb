import userModel from '../models/userModel.js'
import { hashPassword, comparePassword } from './../helpers/authHelper.js'
import JWT from 'jsonwebtoken'

export const registerController = async (req, res) => {
    try {
        const {name, email, password, phone, address, answer} = req.body

        if(!name) {
            return res.send({message: 'Name is required'})
        }
        if(!email) {
            return res.send({message: 'Email is required'})
        }
        if(!password) {
            return res.send({message: 'password is required'})
        }
        if(!phone) {
            return res.send({message: 'Phone is required'})
        }
        if(!address) {
            return res.send({message: 'Address is required'})
        }
        if(!answer) {
            return res.send({message: 'Answer is required'})
        }

        const existingUser = await userModel.findOne({email})

        if(existingUser) {
            return res.status(200).send({
                success: false,
                message: 'Email already exists, please login'
            })
        }

        const hashedPassword = await hashPassword(password)

        const user = await new userModel({name, email, password: hashedPassword, phone, address, answer}).save()

        res.status(201).send({
            success: true,
            message: 'User registered successfully',
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in registerController",
            error
        })
    }
}

export const loginController = async (req, res) => {
    try {
        const {email, password} = req.body
        if(!email || !password) {
            return res.status(404).send({
                success: false,
                message: 'Invalid Email or Password'
            })
        } 

        const user = await userModel.findOne({email})

        if(!user) {
            return res.status(404).send({
                success: false,
                message: 'Email not registered'
            })
        }

        const match = await comparePassword(password, user.password)

        if(!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid Password"
            })
        }

        const token =  JWT.sign({ _id: user._id}, process.env.JWT_SECRET, {expiresIn: "7d"})

        res.status(201).send({
            success: true,
            message: 'Login successful',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role
            },
            token
        })        


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'In Login error',
            error
        })
    }
}

export const forgotPasswordController = async (req, res) => {
    try {
        const {email, answer, newPassword} = req.body;
        if(!email) {
            res.status(400).send({ message: "email is required" })
        }
        if(!answer) {
            res.status(400).send({ message: "answer is required" })
        }
        if(!newPassword) {
            res.status(400).send({ message: "new password is required" })
        }

        const user = await userModel.findOne({email, answer})
        if(!user) {
            res.status(400).send({
                success: false,
                meassage: "wrong email or answer"
            })
        }

        const hashed = await hashPassword(newPassword)

        await userModel.findByIdAndUpdate(user._id, {password: hashed})
        res.status(201).send({
            success: true,
            message: "Password reset sucessful"
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Somthing went wrong"
        }),
        error
    }
}

export const testController = (req, res) => {
    try{
        res.status(200).send('Protected Route')
    } catch(error) {
        console.log(error)
        res.status(404).send({error})
    }
}

export const updateProfileController = async (req, res) => {
    try {
        const {name, email, password, phone, address} = req.body
        const user = await userModel.findById(req.user._id)

        if(password && password?.length<6) {
            return res.json({error: "Password is required and must be at least 6 characters long"})
        }
        const hashedPassword = password? await hashPassword(password) : undefined
        const updatedUser = await userModel.findByIdAndUpdate(req.user._id, {
            name: name || user.name,
            password: hashedPassword || user.password,
            phone: phone || user.phone,
            address: address || user.address
        }, {new: true})

        res.status(200).send({
            success: true,
            message: "profile updated successfully",
            updatedUser
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: "Error in updating user profile",
            error
        })
    }
}