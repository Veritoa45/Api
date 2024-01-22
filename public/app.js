import { io } from '../src/server.js'

const socket = io()

socket.on('connect', () => {
    console.log('Usuario conectado', socket.id)

    socket.on('disconnect', () => {
        console.log('Usuario desconectado')
    })
})