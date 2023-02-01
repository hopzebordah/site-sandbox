import { Session } from 'express-session'
import { CookieData } from '../types.js'

declare module 'express-session' {
    interface Session {
        user: CookieData
    }
}
