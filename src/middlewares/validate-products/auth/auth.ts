import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { log } from 'node:console'
import User, { UserAttributes } from '../../../models/User'

declare global {
  namespace Express {
    interface Request {
      user?: UserAttributes // Define the type of user if you have a specific interface for it
    }
  }
}
export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const bearerToken = req.headers.authorization
  if (!bearerToken) {
    res.status(401).json({
      message: 'Unauthorized. Please sign in to access this resource.'
    })
    return
  }

  const token = bearerToken.split(' ')[1]

  const decodedToken = verify(token, process.env.JWT_SECRET as string)

  if (!decodedToken) {
    res.status(401).json({
      message: 'Unauthorized'
    })
    return
  }

  const { userID } = decodedToken as { userID: string }

  const user = await User.findOne({
    where: { id: userID },
    attributes: ['id', 'name', 'email'] // Selecciona solo los campos necesarios
  })
  if (!user) {
    res.status(401).json({
      message: 'Unauthorized'
    })
    return
  }

  req.user = user

  next()
}
