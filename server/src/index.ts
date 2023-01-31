import express from 'express'
import session from 'express-session'
import cors from 'cors'
import { v4 as uuidv4 } from 'uuid'
import { HTTP_PORT, SESSION_SECRET } from './constants'
import { logOut, registerUser, siteData, validateLogin } from './routes'
import { errorHandler, getPath } from './utils'

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

const adminOnly = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    if (req.session.user) next()
    else res.redirect('/login')
}

app.use('/apps/admin/*', (req, res) => {
    res.redirect('/apps/admin')
})

app.get(['/', '/home'], (req, res) => {
    siteData
        .home()
        .then((data) => res.render('home.pug', { data }))
        .catch(errorHandler(res))
})

app.post('/api/admin/login', (req, res) => {
    const { email, password } = req.body
    validateLogin(email, password)
        .then((data) => {
            req.session.user = data
            res.json(data)
        })
        .catch(errorHandler(res))
})

app.get('/api/admin/login/verify', (req, res) => {
    if (req.session.user) res.sendStatus(200)
    else res.sendStatus(401)
})

app.delete('/api/admin/logout', (req, res) => {
    logOut(req)
        .then(() => res.sendStatus(200))
        .catch(errorHandler(res))
})

app.post('/api/admin/register', adminOnly, (req, res) => {
    const { email, password } = req.body
    registerUser(email, password)
        .then((data) => res.json(data))
        .catch(errorHandler(res))
})

app.use('*', (req, res) => res.render('404.pug'))

app.listen(HTTP_PORT, () => {
    console.log(`Server running on port ${HTTP_PORT}`)
})
