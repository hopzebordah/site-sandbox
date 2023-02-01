import express from 'express'
import {
    destroySession,
    registerUser,
    validateLogin,
} from '../services/adminService.js'
import { errorHandler } from '../utils.js'

const router = express.Router()

const authenticatedOnlyMiddleware = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    if (req.session.user) next()
    else res.redirect('/login')
}

router.use('/admin/*', (req, res) => {
    res.redirect('/admin')
})

router.post('/api/admin/login', (req, res) => {
    const { email, password } = req.body
    validateLogin(email, password)
        .then((data) => {
            req.session.user = data
            res.json(data)
        })
        .catch(errorHandler(res))
})

router.get('/api/admin/login/verify', (req, res) => {
    if (req.session.user) res.sendStatus(200)
    else res.sendStatus(401)
})

router.delete('/api/admin/logout', (req, res) => {
    destroySession(req)
        .then(() => res.sendStatus(200))
        .catch(errorHandler(res))
})

router.post('/api/admin/register', authenticatedOnlyMiddleware, (req, res) => {
    const { email, password } = req.body
    registerUser(email, password)
        .then((data) => res.json(data))
        .catch(errorHandler(res))
})

export default router
