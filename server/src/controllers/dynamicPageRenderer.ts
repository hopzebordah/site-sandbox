import express from 'express'

const router = express.Router()

router.use('*', (req, res) => {
    console.log(req)
    res.render('404.pug')
})

export default router
