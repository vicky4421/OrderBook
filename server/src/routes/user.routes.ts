import { Router } from 'express'
import { registerUser, loginUser, logoutUser, refreshAccessToken, changePassword } from '../controllers/user.controller.js'
import { verifyAcessJWT } from '../middlewares/auth.middleware.js'

const router = Router()

router.route("/register").post(registerUser)

export default router