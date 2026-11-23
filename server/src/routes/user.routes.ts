import { Router } from 'express'
import { registerUser, loginUser, logoutUser, refreshAccessToken, changePassword } from '../controllers/user.controller.js'
import { verifyAcessJWT } from '../middlewares/auth.middleware.js'
import { validateInput } from '../middlewares/validate.middleware.js'
import { zodRegisterUserSchema } from '../validators/user.validator.js'

const router = Router()

router.route("/register").post(validateInput(zodRegisterUserSchema), registerUser)

export default router