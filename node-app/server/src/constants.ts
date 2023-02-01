import { v4 as uuidv4 } from 'uuid'

export const HTTP_PORT = 3000
export const UP = 'UP'
export const DOWN = 'DOWN'

export const SESSION_SECRET = 'some_temp_secret'
export const SALT_ROUNDS = 10
export const DEFAULT_USER_RECORD = {
    id: uuidv4(),
    email: 'aalcocerpeters@gmail.com',
    password: '$2b$10$67tbZnPthE3Tn2ryJB6GaemW2Ibl0qUgOLp4uUpl/nK.eG3zvNHQ6',
    createdAt: new Date('2023-01-18T22:03:40.591Z'),
    updatedAt: new Date('2023-01-18T22:03:40.591Z'),
}
