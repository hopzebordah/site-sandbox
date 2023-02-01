import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
    res.render('home.pug')
})

router.use('*', (req, res) => {
    const url = req.baseUrl + req.path
    res.render('404.pug')
})

export default router
