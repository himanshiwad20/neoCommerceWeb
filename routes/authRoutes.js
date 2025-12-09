import express from 'express'
import {registerController, loginController, forgotPasswordController, testController, updateProfileController} from '../controllers/authController.js'
import { isAdmin, requireSignIn, isUser } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post("/register", registerController)

router.post("/login", loginController)

router.post('/forgotPassword', forgotPasswordController)

router.get("/test", requireSignIn, isAdmin, testController)

// protected route auth
router.get("/userAuth", requireSignIn, isUser, (req, res) => {
    res.status(200).send({ ok: true })
})

router.get('/adminAuth', requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok:true })
})

router.put('/profile', requireSignIn, updateProfileController)

export default router;