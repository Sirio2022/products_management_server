import { exit } from 'node:process'
import path from 'node:path'
import { Sequelize } from 'sequelize-typescript'
import picocolors from 'picocolors'

const modelsPath =
  process.env.NODE_ENV === 'production'
    ? path.join(__dirname, '..', 'models') // Ruta para producción
    : path.join(__dirname, '/../models') // Ruta para desarrollo

export const sequelize = new Sequelize({
  database: process.env.MYSQL_DATABASE,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  dialect: 'mysql',
  protocol: 'mysql',
  logging: false,
  models: [modelsPath],
  timezone: '-05:00',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
})

export const connectDB = async (): Promise<void> => {
  try {
    await sequelize.authenticate()
    if (process.env.NODE_ENV !== 'production') {
      await sequelize.sync()
      console.log(
        picocolors.yellowBright(
          'Conexión exitosa con la base de datos en modo desarrollo'
        )
      )
    } else {
      console.log(
        picocolors.cyanBright(
          'Conexión exitosa con la base de datos en modo producción'
        )
      )
    }
  } catch (err: unknown) {
    console.log(picocolors.red('Error al conectar con la base de datos'))
    if (err instanceof Error) {
      console.log(picocolors.redBright(err.message))
    } else {
      console.log(picocolors.redBright('Error desconocido'))
    }
    exit(1)
  }
}
