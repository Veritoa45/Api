import User from '../models/user.model.js'

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).json(users)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Error al obtener los usuarios" })
    }
}

export const getOneUser = async (req, res) => {
    try {
        const userName = req.params.userName
        const user = await User.findOne({ userName })
        if(!user) {
            return res.status(404).json({ message: "Usuario incorrecto" })
        }
        res.status(200).json(user)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Error al obtener el usuario" })
    }
}

export const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body)
        res.status(201).json(user)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Error al crear el usuario" })
    }
}

export const updateUser = async (req, res) => {
    try {
        const { password } = req.body
        const userName = req.params.userName
        const user = await User.findOneAndUpdate({ userName }, {
            password,
        }, 
        { 
            new: true 
        },
        )
        if(!user) {
            return res.status(404).json({ message: "Usuario incorrecto" })
        }
        res.status(200).json(user)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Error al actualizar el usuario" })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const userName = req.params.userName
        const user = await User.findOneAndDelete({ userName })
        if(!user) {
            return res.status(404).json({ message: "Usuario incorrecto" })
        }
        res.status(200).json({ message: "Usuario eliminado" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Error al eliminar el usuario" })
    }
}