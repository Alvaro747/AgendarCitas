const {Router} = require('express')
const { createUser, loginUser} = require('../controller/auth')

const router = Router()


/**Login usuario */
router.post('/login',loginUser)


/**Registro Usuario */
router.post('/register/usuario',createUser)






module.exports = router