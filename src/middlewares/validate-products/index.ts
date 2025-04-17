import { Request, Response, NextFunction } from 'express'
import { productSchema } from '../../schemas/productSchema'

export function validateProductRequest(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (req.body.price) {
    req.body.price = parseFloat(req.body.price)
  }

  if (req.body.stock) {
    req.body.stock = parseInt(req.body.stock)
  }

  productSchema.parse(req.body)
  next()
}

export function validateProductUpdateRequest(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (req.body.price) {
    req.body.price = parseFloat(req.body.price)
  }

  if (req.body.stock) {
    req.body.stock = parseInt(req.body.stock)
  }

  productSchema.partial().parse(req.body)
  next()
}
