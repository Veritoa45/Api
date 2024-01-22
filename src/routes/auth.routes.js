import { Router } from 'express'
import { register, login, logout } from '../controllers/auth.controllers.js'
import { validateSchema } from '../middlewares/validateSchema.js'
import { userSchema } from '../lib/validations.js'

const authRouter = Router()

authRouter.post('/register', validateSchema(userSchema), register)
authRouter.post('/login', login)
authRouter.post('/logout', logout)

export { authRouter }