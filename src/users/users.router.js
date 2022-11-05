const router = require('express').Router()
const passport = require('passport')//?1 para rutas  protegidas
const adminValidate = require('../middlewares/rol.middleware')
const userServices = require('./users.services')
const {getUserRecipes} = require('../recipes/recipes.services')

//? rutas raiz

// router.get('/', passport.authenticate('jwt',{session:false}),
//             userServices.getAllUsers)//? 3con esto la ryta esta protegida


router.get('/',userServices.getAllUsers)      

require('../middlewares/auth.middleware')(passport)//? 2para rutas protegidas

//TODO el registerUser ira en la ruta /auth/register

//! router.route('/').get( userServices.getAllUsers)

//? rutas dinamicas por ID /users/:id

//! router.get('/:id')
//! router.patch('/:id')
//! router.put('/:id')
//! router.delete('/:id')
//?/api/v1/users/:id


//? Ruta de informaci'on propia del usuario logueado
router.route('/me')
    .get(
        passport.authenticate('jwt',{session:false}),
        userServices.getMyUser)
    .patch(
        passport.authenticate('jwt',{session:false}),
        userServices.patchMyUser
    )
    .delete(
        passport.authenticate('jwt', {session:false}),
        userServices.deleteMyUser
    )

//? rutas para obtener las recetas
    router.get('/me/my_recipes', 
        passport.authenticate('jwt', {session: false}),
        getUserRecipes
)


//? /api/v1/users/:id
router.route('/:id')
    .get(userServices.getUserById)
    .patch(
        passport.authenticate('jwt', {session: false}),
        adminValidate,
        userServices.patchUser
    )
    .delete(
        passport.authenticate('jwt', {session: false}),
        adminValidate,
        userServices.deleteUser
    )




module.exports = router
