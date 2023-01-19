import express from 'express'
import session from 'express-session'
import cors from 'cors'
import { v4 as uuidv4 } from 'uuid'
import { HTTP_PORT, SESSION_SECRET } from './constants'
import { healthCheck, registerUser, siteData, validateLogin } from './routes'
import { errorHandler, getPath } from './utils'
import db from './db'

const sessionConfig = {
    genid: () => uuidv4(),
    secret: SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: { secure: false }, // TODO set this based on HTTPS or not
    name: 'auth',
}

const app = express()

app.set('view engine', 'pug')
app.set('views', getPath('/views'))

app.use(cors())
app.use(express.json())
app.use(express.static(getPath('/public')))
app.use(session(sessionConfig))

// TODO delete this - for debug only
app.get('/api/db', (req: express.Request, res: express.Response) => {
    res.json(db)
})

app.get('/api/health', (req: express.Request, res: express.Response) => {
    healthCheck()
        .then((healthData) => res.json(healthData))
        .catch(errorHandler(res))
})

app.get('/', (req: express.Request, res: express.Response) => {
    siteData
        .home()
        .then((data) => res.render('home.pug', { data }))
        .catch(errorHandler(res))
})

app.get('/login', (req: express.Request, res: express.Response) => {
    siteData
        .login()
        .then((data) => res.render('login.pug', { admin: true, data }))
        .catch(errorHandler(res))
})

// TODO find a good toast notification library to use on the frontend

app.post('/login', (req: express.Request, res: express.Response) => {
    const { email, plaintext } = req.body
    validateLogin(email, plaintext)
        .then((data) => {
            req.session.user = data
            res.sendStatus(200)
        })
        .catch(errorHandler(res))
})

const adminOnly = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    if (req.session.user) next()
    else res.redirect('/login')
}

app.post(
    '/api/register',
    adminOnly,
    (req: express.Request, res: express.Response) => {
        const { email, plaintext } = req.body
        registerUser(email, plaintext)
            .then((data) => res.json(data))
            .catch(errorHandler(res))
    },
)

// secure endpoints with jwt
// 404

app.listen(HTTP_PORT, () => {
    console.log(`Server running on port ${HTTP_PORT}`)
})
