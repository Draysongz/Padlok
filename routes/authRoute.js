const express = require('express')
const router = express.Router()
const {register, login, sendresetPassword, resetPassword} = require('../controllers/auth')


router.post('/register', register )
router.get('/login', login)
router.post('/password-reset', sendresetPassword )
router.post('/password-reset:token', resetPassword)





module.exports = router