import { Router } from 'express'
import { getOneUser, getAllUsers, createUser, updateUser, deleteUser } from '../controllers/users.controllers.js'

const usersRouter = Router()

usersRouter.get('/', getAllUsers)
usersRouter.get('/:userName', getOneUser)
usersRouter.post('/', createUser)
usersRouter.patch('/:userName', updateUser)
usersRouter.delete('/:userName', deleteUser)

export { usersRouter }
