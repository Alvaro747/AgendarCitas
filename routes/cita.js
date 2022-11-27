const {Router} = require('express')
const {getCitas,createCita,deleteCita, getCitaForDelete} = require('../controller/cita')

const router = Router()


/** obtener todas las citas del usuario */
router.get('/citas',getCitas)


/** Crear una nueva cita */
router.post('/cita',createCita)

/** obtener cita para eliminar posterior mente */
router.get('/cita',getCitaForDelete)

/**Eliminar una cita */
router.delete('/cita',deleteCita)

module.exports = router

