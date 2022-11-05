const router = require('express').Router()
const passport = require('passport')

const recipesServices = require('./recipes.services')

require('../middlewares/auth.middleware')(passport)
//?recipes
//? /recipes/:recipes_id


router.route('/')

    .get(recipesServices.getAllRecipes)
    .post(
        passport.authenticate('jwt',{session:false}),
        recipesServices.createRecipes
    )

    router.route('/:recipe_id')
    .get(recipesServices.getRecipeById)
    .patch(
        passport.authenticate('jwt', {session: false}),
        recipesServices.patchRecipe
    )
    .delete(
        passport.authenticate('jwt',{session:false}),
        recipesServices.patchRecipe

    )

    module.exports = router