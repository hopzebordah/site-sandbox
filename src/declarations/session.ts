import { Session } from 'express-session'
import { CookieData } from '../types'

declare module 'express-session' {
    interface Session {
        user: CookieData
    }
}
