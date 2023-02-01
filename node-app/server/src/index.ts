import express from 'express'
import session from 'express-session'
import cors from 'cors'
import { v4 as uuidv4 } from 'uuid'
import { HTTP_PORT, SESSION_SECRET } from './constants.js'
import { getPath } from './utils.js'
import adminController from './controllers/adminController.js'
import dynamicPageRenderer from './controllers/dynamicPageRenderer.js'

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

app.use(adminController)
app.use(dynamicPageRenderer)

app.listen(HTTP_PORT, () => {
    console.log(`Server running on port ${HTTP_PORT}`)
})
