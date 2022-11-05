const router = require('express').Router()
const adminValidate = require('../middlewares/rol.middleware')
const passport = require('passport')
const categoryServices = require('./categories.services')

//? / 
//? /:id


router.route('/')
    .get(categoryServices.getAllCategories)
    .post(passport.authenticate('jwt', {session: false}),
          adminValidate,
         categoryServices.postCategory) //TODO hacerla protegida por administrador

router.route('/:id')
    .get(categoryServices.getCategoryById)
    .delete(passport.authenticate('jwt', {session: false}),
            adminValidate,
            categoryServices.deleteCategories) //TODO hacerla protegida por administrador

module.exports = router