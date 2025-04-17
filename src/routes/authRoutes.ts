import { Router } from 'express'
import asyncHandler from 'express-async-handler'
import AuthController from '../controllers/authController'
import {
  newConfirmationRequest,
  validateLoginRequest,
  validateResetPasswordRequest,
  validateUserRequest,
  validateUserTokenRequest,
  validateParams,
  validateProfileRequest,
  validateChangeProfilePasswordRequest
} from '../middlewares/validate-users'
import { tokenSchema } from '../schemas/authSchema'
import { authMiddleware } from '../middlewares/validate-products/auth/auth'

const router: Router = Router()

router.post(
  '/signup',
  asyncHandler(validateUserRequest),
  asyncHandler(AuthController.createAccount)
)

router.post(
  '/confirm-account',
  asyncHandler(validateUserTokenRequest),
  asyncHandler(AuthController.confirmAccount)
)

router.post(
  '/login',
  asyncHandler(validateLoginRequest),
  asyncHandler(AuthController.login)
)

router.post(
  '/resend-confirmation',
  asyncHandler(newConfirmationRequest),
  asyncHandler(AuthController.newConfirmationEmail)
)

router.post(
  '/forgot-password',
  asyncHandler(newConfirmationRequest),
  asyncHandler(AuthController.forgotPassword)
)

router.post(
  '/validate-password-token',
  asyncHandler(validateUserTokenRequest),
  asyncHandler(AuthController.validateToken)
)

router.post(
  '/reset-password/:token',
  validateParams(tokenSchema), // Validar el parámetro token directamente
  asyncHandler(validateResetPasswordRequest),
  asyncHandler(AuthController.resetPassword)
)

router.get(
  '/user',
  asyncHandler(authMiddleware), // Middleware de autenticación
  asyncHandler(AuthController.user)
)

/** Profile */
router.patch(
  '/profile',
  asyncHandler(authMiddleware), // Middleware de autenticación
  asyncHandler(validateProfileRequest), // Validar el cuerpo de la solicitud
  asyncHandler(AuthController.updateProfile)
)

router.post(
  '/profile/change-password',
  asyncHandler(authMiddleware), // Middleware de autenticación
  asyncHandler(validateChangeProfilePasswordRequest), // Validar el cuerpo de la solicitud
  asyncHandler(AuthController.changeProfilePassword)
)

export default router
