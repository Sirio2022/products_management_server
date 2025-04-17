import { sign } from 'jsonwebtoken'

interface JWTPayload {
  userID: string
}

export function generateJWT({ userID }: JWTPayload): string {
  const token = sign({ userID }, process.env.JWT_SECRET as string, {
    expiresIn: '1d'
  })

  return token
}
