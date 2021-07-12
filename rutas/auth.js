const {Router} = require('express')
const router = Router()
const {check} = require('express-validator')
const { createuser, login, renew } = require('../controllers/auth')
const { validarCampos } = require('../middlewares/validator')
const {validarJWT} = require('../middlewares/validar-jwt')

router.post('/new',
[
    check('name', 'nombre es obligatorio').not().isEmpty(),
    check('email', 'email es obligatorio').isEmail(),
    check('password', 'el password es obligatorio o no puede ser menor a 5 letras').isLength({ min: 5 }),
    validarCampos
] 
,createuser)

router.post('/', [
    check('email', 'email es obligatorio').isEmail(),
    check('password', 'el password es obligatorio o no puede ser menor a 5 letras').isLength({ min: 5 }),
    validarCampos
] ,login)

router.get('/renew', validarJWT ,renew)


module.exports = router