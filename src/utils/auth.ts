import crypto from 'node:crypto'

export const hashPassword = (password: string) => {
  const salt = crypto.randomBytes(16).toString('hex')
  const hashedPassword = crypto
    .createHmac('sha256', salt)
    .update(password)
    .digest('hex')
  return `${salt}.${hashedPassword}` // Almacena el salt y el hashedPassword juntos
}

export const checkPassword = async (
  password: string,
  hashedPassword: string
) => {
  const [salt, originalHash] = hashedPassword.split('.')
  const hash = crypto.createHmac('sha256', salt).update(password).digest('hex')
  return hash === originalHash // Compara el hash generado con el hash original
}
