import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import db from '../db'
import { SALT_ROUNDS } from '../constants'
import { ClientError, NotAuthorizedError } from '../errors'
import { CookieData, HealthData } from '../types'

// TODO write some rate limiting logic here to prevent people from brute forcing passwords
export const validateLogin = async (
    email?: string,
    plaintext?: string,
): Promise<CookieData> => {
    if (!email || !plaintext) {
        throw new ClientError('both email and password required to log in')
    }
    const user = db.users.find((user) => user.email === email)
    if (!user) {
        throw new NotAuthorizedError(
            'Could not find matching login. Are your credentials correct?',
        )
    }
    const match = await bcrypt.compare(plaintext, user.password)
    if (!match) {
        throw new NotAuthorizedError("Sorry, that email/password didn't work")
    }
    return { userId: user.id, email: user.email }
}

export const destroySession = async (req: Express.Request) => {
    if (req.session.user) {
        await new Promise<void>((resolve, reject) => {
            req.session.destroy((err) => {
                if (err) reject(err)
                else resolve()
            })
        })
    }
}

export const registerUser = async (email?: string, plaintext?: string) => {
    if (!email || !plaintext) {
        throw new ClientError(
            'both email and password required to register user',
        )
    }
    const existingUser = db.users.find((user) => user.email === email)
    if (existingUser) {
        throw new ClientError('user already exists with email')
    }
    // TODO ensure the password meets requirements
    const password = await bcrypt.hash(plaintext, SALT_ROUNDS)
    const now = new Date()
    const user = {
        id: uuidv4(),
        email,
        password,
        createdAt: new Date(now),
        updatedAt: new Date(now),
    }
    // TODO change this to mongo
    db.users.push(user)
    return user.email
}
