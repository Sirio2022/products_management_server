import { Response, Request, NextFunction } from 'express'

// Middleware to handle CORS errors
export const handleCorsError = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error.message === 'Not allowed by CORS') {
    res.status(403).json({ message: 'Not allowed by CORS' })
  } else {
    next(error)
  }
}
