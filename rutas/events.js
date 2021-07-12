const {Router} = require('express')
const { borrarEventos,actualizarEventos,crearEventos,getEventos } = require('../controllers/eventos')
const {validarJWT} = require('../middlewares/validar-jwt')
const {check} = require('express-validator')
const { validarCampos } = require('../middlewares/validator')
const {isDate} = require('../helpers/isDate')
const router = Router()


router.use(validarJWT)
router.get('/', getEventos)
router.post('/',
[
 check('title','el titulo es obligatorio').not().isEmpty(),
 check('start','la fecha de inicio es obligatoria').custom(isDate),
 check('end','la fecha de finalizacion es obligatoria').custom(isDate),
 validarCampos
] ,crearEventos)
router.put('/:id', actualizarEventos)
router.delete('/:id', borrarEventos)

module.exports = router 