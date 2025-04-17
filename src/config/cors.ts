import { CorsOptions } from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const whitelist = [
  process.env.FRONTEND_URL,
  process.env.FRONTEND_URL_2,
  process.env.FRONTEND_URL_3,
  process.env.FRONTEND_URL_4,
  process.env.SERVOR_URL,
  process.env.APOLLO_URL,
  process.env.POSTMAN_URL
]

export const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (origin && whitelist.includes(origin)) {
      callback(null, true)
      return
    }

    callback(new Error('Not allowed by CORS'))
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'Origin',
    'X-Requested-With',
    'Content-Length',
    'Accept',
    'X-HTTP-Method-Override',
    'access-allow-credentials'
  ],
  credentials: true
}
