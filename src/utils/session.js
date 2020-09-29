import { withIronSession } from 'next-iron-session'
import getConfig from 'next/config'

const cookieName = 'session'
const secondsInDay = 60 * 60 * 24
const cookieMaxAgeInDays = 60
const cookieMaxAgeInSeconds = secondsInDay * cookieMaxAgeInDays

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()

export function withServerSession(handler) {
  return withIronSession(handler, {
    password: serverRuntimeConfig.ironSessionPassword,
    cookieName: cookieName,
    cookieOptions: {
      httpOnly: true,
      maxAge: cookieMaxAgeInSeconds,
      secure: process.env.NODE_ENV === 'production',
      domain: publicRuntimeConfig.domain
    }
  })
}
