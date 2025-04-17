import express, { Express } from 'express'
import cron from 'node-cron'
import { Op } from 'sequelize'
import dotenv from 'dotenv'
import cors from 'cors'
import { corsOptions } from './config/cors'
import authRoutes from './routes/authRoutes'
import productsRoutes from './routes/productsRoutes'
import { handleCorsError } from './middlewares/handleCorsError'
import { errorHandler } from './middlewares/errorHandler'
import { connectDB } from './config/db'
import { syntaxErrorHandler } from './middlewares/syntaxErrorHandler'
import { jsonSyntaxErrorHandler } from './middlewares/jsonSyntaxErrorHandler'
import picocolors from 'picocolors'
import Token from './models/Token'

// Load environment variables
dotenv.config()

// Connect to database
connectDB()

// Initialize server
const server: Express = express()
server.disable('x-powered-by')

// Middleware para manejar errores de sintaxis en JSON
server.use(jsonSyntaxErrorHandler)

// Middleware para manejar SyntaxError
server.use(syntaxErrorHandler)

// Middleware
server.use(express.json())

// CORS
server.use(cors(corsOptions))
server.use(handleCorsError)

// Routes
server.use('/api/auth', authRoutes)
server.use('/api/products', productsRoutes)

// Programa una tarea para ejecutarse cada 10 minutos
cron.schedule('*/10 * * * *', async () => {
  try {
    const result = await Token.destroy({
      where: {
        expiredAt: {
          [Op.lt]: new Date()
        }
      }
    })
    console.log(picocolors.magenta(`Tokens expirados eliminados: ${result}`))
  } catch (error) {
    console.error(
      picocolors.redBright('Error eliminando tokens expirados:' + error)
    )
  }
})

// Error handler. Must be the last middleware
server.use(errorHandler)

export default server
