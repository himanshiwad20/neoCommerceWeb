import express from 'express'
import color from 'colors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDb from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import cors from 'cors'
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoutes.js'
import path from 'path'
import { fileURLToPath } from "url";
dotenv.config()
connectDb()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.static(path.join(__dirname, './client/build')))

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/category', categoryRoutes)
app.use('/api/v1/product', productRoutes)


// app.use("*", function(req, res) {
//     res.sendFile(path.join(__dirname, "./client/build/index.html"))
// })
// app.get('/', (req, res) => {
//     res.send("<h1>Welcome!</h1>")
// })

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "client", "build")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "client", "build", "index.html"));
    });
}

const PORT = process.env.PORT ||  8080


app.listen(PORT, () => {
    console.log(`Server is running on ${process.env.DEV_MODE} mode on ${PORT}`.bgCyan.white)
})
