import { Request, Response, NextFunction } from 'express'

import {
  authSchema,
  loginSchema,
  resendConfirmationSchema,
  resetPasswordSchema,
  resetProfilePasswordSchema,
  tokenSchema,
  updateProfileSchema
} from '../../schemas/authSchema'

export function validateUserRequest(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  authSchema.parse(req.body)
  next()
}

export function validateUserTokenRequest(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  tokenSchema.parse(req.body)
  next()
}

export function validateLoginRequest(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  loginSchema.parse(req.body)
  next()
}

export function newConfirmationRequest(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  resendConfirmationSchema.parse(req.body)
  next()
}

export function validateResetPasswordRequest(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  resetPasswordSchema.parse(req.body)
  next()
}

export function validateParams(schema: any) {
  return (req: Request, res: Response, next: NextFunction): void => {
    schema.parse(req.params)
    next()
  }
}

export function validateProfileRequest(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  updateProfileSchema.parse(req.body)
  next()
}

export function validateChangeProfilePasswordRequest(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  resetProfilePasswordSchema.parse(req.body)
  next()
}
