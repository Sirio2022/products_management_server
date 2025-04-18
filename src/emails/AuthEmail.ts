import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

if (!process.env.EMAIL_FROM) {
  throw new Error('EMAIL_FROM is not defined')
}

interface AuthMailInterface {
  name: string
  email: string
  token: string
}

export class AuthMail {
  static readonly sendConfirmationEmail = async ({
    name,
    email,
    token
  }: AuthMailInterface) => {
    const info = await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: email,
      subject: 'Confirm your account',
      html: `
      <h1>Hello ${name}</h1>
      <p>Thank you for creating an account with us.</p>
      <p>Please confirm your account by clicking the link below:</p>
        <a href="${process.env.FRONTEND_URL}/auth/confirm-account">Confirm Account</a>
        <p>Copy and paste your token in the link below:</p>
        <strong>${token}</strong>
        <p>If you did not create an account, please ignore this email.</p>  
        <p>Best regards,</p>
        <p>Products Management Team</p>
        <p>Note: This Token will expire in 10 minutes.</p>
      
      `
    })
    console.log('Message sent: %s', info.data?.id)
  }

  static readonly sendPasswordResetToken = async ({
    name,
    email,
    token
  }: AuthMailInterface) => {
    const info = await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: email,
      subject: 'Reset your password',
      html: `
      <h1>Hello ${name}</h1>
      <p>
      We received a request to reset your password.</p>
      <p>If you did not request a password reset, please ignore this email.</p>
      </p>
      <p>
      Please reset your password by clicking the link below:</p>
        <a href="${process.env.FRONTEND_URL}/auth/reset-password">Reset Password</a>
        <p>Copy and paste your token in the link below:</p>
        <strong>${token}</strong>
        <p>If you did not create an account, please ignore this email.</p>  
        <p>Best regards,</p>
        <p>Products Management Team</p>
        <p>Note: This Token will expire in 10 minutes.</p>
      
      `
    })

    console.log('Message sent: %s', info.data?.id)
  }
}
