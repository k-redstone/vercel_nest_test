import { JwtPayload } from '@src/auth/types/token-data.type'
declare module 'express' {
  interface Request {
    user: JwtPayload
    cookies: {
      refreshToken: string
      accessToken: string
    }
  }
}
