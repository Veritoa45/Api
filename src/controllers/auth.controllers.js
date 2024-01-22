import { encryptPassword, comparePassword } from '../lib/password.js'
import User from '../models/user.model.js'

export const register = async (req, res) => {
    try {
        const { firstName, lastName, userName, password } = req.body
        const userExist = User.findOne({ userName })
        if (userExist && userExist.length >0) {
            return res.status(400).json({ message: "El usuario ya existe" })
        }
        const encryptedPassword = await encryptPassword(password).catch(error => {
            console.error('Error al cifrar la contraseña:', error);
            res.status(500).json({ message: "Error del servidor al registrarse" });
        });
        const newUser = new User({
            firstName,
            lastName,
            userName,
            password: encryptedPassword,
        })
        const userSaved = await newUser.save()
        req.session.userId = userSaved._id
        delete userSaved.password
        res.status(201).json({ message: 'Usuario registrado con éxito' });
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Error del servidor al registrarse" })
    }
}

export const login = async (req, res) => {
    try {
        const { userName, password } = req.body
        const user = await User.findOne({ userName })
        if (!user) {
            return res.status(400).json({ message: "Credenciales inválidas" })
        }
        const isValidPassword = await comparePassword(password, user.password)
        if (!isValidPassword) {
            return res.status(400).json({ message: "Credenciales inválidas" })
        }
        if (user.isAdmin) {
            req.session.isAdmin = true;
        }
        req.session.userId = user._id
        delete user.password
        res.status(200).json(user)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Error del servidor al iniciar sesión" })
    }
}

export const logout = (req, res) => {
    req.session.destroy()
    res.clearCookie("connect.sid")
    res.redirect("/");
}