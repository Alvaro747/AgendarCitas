const {Router} = require('express')
const { getInfoUser } = require('../controller/usuario')


const router = Router()


/**traer datos del usuario  */
router.get('/usuario',getInfoUser)










module.exports = router