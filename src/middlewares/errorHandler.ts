import { Request, Response, NextFunction } from 'express'
import { log } from 'node:console'
import * as z from 'zod'

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof z.ZodError) {
    log('Error:', err.errors)
    res.status(400).json({ errors: err.errors })
    return
  }

  console.error(err.stack)
  res.status(500).json({ message: 'Internal Server Error', error: err.message })
}
