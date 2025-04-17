import { NextFunction, Request, Response } from 'express'
import User from '../models/User'
import { checkPassword, hashPassword } from '../utils/auth'
import Token from '../models/Token'
import { generateToken } from '../utils/token'
import { generateJWT } from '../utils/jwt'
import { AuthMail } from '../emails/AuthEmail'

export default class AuthController {
  static async createAccount(req: Request, res: Response, next: NextFunction) {
    const { password, email } = req.body

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } })
    if (existingUser) {
      res.status(409).json({
        message: 'User already exists with this email address.'
      })
    }

    const user = new User(req.body)

    // Hash the password
    user.password = hashPassword(password)

    // Save the user
    await user.save()

    // Delete any existing tokens for the user
    await Token.destroy({ where: { userId: user.id } })

    // Generate a token
    const token = new Token()
    token.token = generateToken()
    token.userId = user.id

    // Save the token
    await token.save()

    // Send the token to the user via email
    await AuthMail.sendConfirmationEmail({
      name: user.name,
      email: user.email,
      token: token.token
    })

    res.status(201).json({
      message:
        'User created successfully. Please check your email to confirm your account.'
    })
  }

  static async confirmAccount(req: Request, res: Response, next: NextFunction) {
    const { token } = req.body

    // Find the token
    const existingToken = await Token.findOne({ where: { token } })
    if (!existingToken) {
      res.status(400).json({
        message: 'Invalid token or token expired.'
      })
      return
    }

    // Find the user
    const user = await User.findByPk(existingToken.userId)
    if (!user) {
      res.status(404).json({
        message: 'User not found.'
      })
      return
    }

    // Confirm the account
    user.confirmed = true
    await user.save()

    // Delete the token
    await Token.destroy({ where: { token } })

    res.status(200).json({
      message: 'Account confirmed successfully.'
    })
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body

    // Find the user
    const user = await User.findOne({ where: { email } })
    if (!user) {
      res.status(404).json({
        message: 'User not found.'
      })
      return
    }

    if (!user.confirmed) {
      const token = new Token()
      token.token = generateToken()
      token.userId = user.id
      await token.save()

      await AuthMail.sendConfirmationEmail({
        name: user.name,
        email: user.email,
        token: token.token
      })

      res.status(400).json({
        message:
          'Account not confirmed. Please check your email to confirm your account.'
      })
      return
    }

    // Check the password
    const isPasswordValid = await checkPassword(password, user.password)
    if (!isPasswordValid) {
      res.status(400).json({
        message: 'Invalid email or password.'
      })
      return
    }

    const token = generateJWT({ userID: user.id })

    res.status(200).json({
      message: 'User logged in successfully.',
      token
    })
  }

  static async newConfirmationEmail(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { email } = req.body

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } })
    if (!existingUser) {
      res.status(404).json({
        message: 'User not found with this email address.'
      })
      return
    }

    // Check if the user is already confirmed
    // If the user is already confirmed, we don't need to send a new confirmation email
    if (existingUser.confirmed) {
      res.status(403).json({
        message: 'Account already confirmed.'
      })
      return
    }

    // Generate a token
    const token = new Token()
    token.token = generateToken()
    token.userId = existingUser.id

    // Send the token to the user via email
    await AuthMail.sendConfirmationEmail({
      name: existingUser.name,
      email: existingUser.email,
      token: token.token
    })

    await Token.destroy({ where: { userId: existingUser.id } })
    await token.save()

    res.status(201).json({
      message:
        'New confirmation email sent successfully. Please check your email to confirm your account.'
    })
  }

  static async forgotPassword(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } })
    if (!existingUser) {
      res.status(404).json({
        message: 'User not found with this email address.'
      })
      return
    }

    // Generate a token
    const token = new Token()
    token.token = generateToken()
    token.userId = existingUser.id

    // Send the token to the user via email
    await AuthMail.sendPasswordResetToken({
      name: existingUser.name,
      email: existingUser.email,
      token: token.token
    })

    await Token.destroy({ where: { userId: existingUser.id } })
    await token.save()

    res.status(201).json({
      message:
        'New password reset email sent successfully. Please check your email to reset your password.'
    })
  }

  static async validateToken(req: Request, res: Response, next: NextFunction) {
    const { token } = req.body

    // Find the token
    const existingToken = await Token.findOne({ where: { token } })
    if (!existingToken) {
      res.status(400).json({
        message: 'Invalid token or token expired.'
      })
      return
    }

    res.status(200).json({
      message: 'Token is valid. You can reset your password now.'
    })
  }

  static async resetPassword(req: Request, res: Response, next: NextFunction) {
    const { token } = req.params
    const { password } = req.body

    // Find the token
    const existingToken = await Token.findOne({ where: { token } })
    if (!existingToken) {
      res.status(400).json({
        message: 'Invalid token or token expired.'
      })
      return
    }

    // Find the user
    const user = await User.findByPk(existingToken.userId)
    if (!user) {
      res.status(404).json({
        message: 'User not found.'
      })
      return
    }

    // Hash the password and update it in the database
    user.password = hashPassword(password)
    await user.save()

    // Delete the token
    await Token.destroy({ where: { token } })

    res.status(200).json({
      message: 'Password reset successfully.'
    })
  }

  static async user(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    res.status(200).json({
      user: req.user
    })
  }

  static async updateProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { name, email } = req.body

    // Find the user
    const user = await User.findOne({
      where: { email }
    })

    // Check if the email already exists for another user
    if (user && user.id !== req.user?.id) {
      res.status(409).json({
        message: 'User already exists with this email address.'
      })
      return
    }

    // Update the user profile
    await User.update({ name, email }, { where: { id: req.user?.id } })

    res.status(200).json({
      message: 'Profile updated successfully.'
    })
  }

  static async changeProfilePassword(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { currentPassword, newPassword } = req.body
    const user = await User.findByPk(req.user?.id)

    const isPasswordValid = await checkPassword(
      currentPassword,
      user?.password ?? ''
    )
    if (!isPasswordValid) {
      res.status(401).json({
        message: 'Your old password is incorrect.'
      })
      return
    }

    // Hash the new password and update it in the database
    user!.password = hashPassword(newPassword)
    await user?.save()

    res.status(200).json({
      message: 'Password changed successfully.'
    })
  }
}
