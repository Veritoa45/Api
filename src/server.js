import http from 'node:http'
import express from 'express'
import { Server } from 'socket.io'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import MongoStore from 'connect-mongo'
import { usersRouter } from './routes/users.routes.js'
import { authRouter } from './routes/auth.routes.js'
import { productsRouter } from './routes/products.routes.js'
import { ordersRouter } from './routes/orders.routes.js'
import { connectDB } from './config/db.js';
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const server = http.createServer(app)
const io = new Server(server)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(
    session({
        secret: "secret",
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({ 
            mongoUrl: "mongodb://127.0.0.1:27017/api" 
        }),
        cookie: {
            secure: false,
        }
    })
)

app.use(cookieParser())

app.use(express.static(path.join(__dirname, '../public')))

app.use("/auth", authRouter)
app.use("/users", usersRouter)
app.use("/products", productsRouter)
app.use("/orders", ordersRouter)

io.on("connection", (socket) => {
    console.log("Usuario conectado", socket.id)
    
    socket.on("message", (data) => {
        console.log("Mensaje recibido", data)
    })

    socket.on("disconnect", () => {
        console.log("Usuario desconectado", socket.id)
    })
})

const main = async () => {
    try {
        await connectDB()
        server.listen(8080, () => 
            console.log("Servidor corriendo en http://localhost:8080")
    )} catch (error) {
        console.error(error)
        process.exit(1)
    }
}

main()

export { io }
