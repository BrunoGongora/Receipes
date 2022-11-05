const recipesControllers = require('./recipes.controllers')

const getAllRecipes = (req, res)=>{
    recipesControllers.getAllRecipes()
    .then(data=>{
        res.status(200).json(data)
    })
    .catch(err=>{
        res.status(400).json({message: err.message})
    })
}

const getRecipeById = (req,res)=>{
    const id = req.params.recipe_id
    recipesControllers.getRecipeById(id)
        .then(data=>{
            if(data){
                res.status(200).json(data)
            }else{
                res.status(404).json({message:'Invalidd Id', id})
            }
        })
        .catch(err=>{
            res.status(400).json({message: err.message})
        })
}

const createRecipes = (req,res)=>{
    const userId = req.user.id
    const {title, description,urlImg, time, portions, categoryId, origin, likes} = req.body
        if(title &  description && time && portions && categoryId){
            recipesControllers.createRecipe({title, description,urlImg, time, portions, categoryId, origin, likes, userId
            })
                .then(data =>{
                    res.status(201).json(data)
                })
                .catch(err=>{
                    res.status(400).json({message:err.message})
                })

        }else{
            res.status(400).json({
                message:'Missing Data',
                fields: {
                    title: 'string',
                    description:'string',
                    time: 'number',
                    portions: 'number',
                    categoryId: 'number'

                }
            })
        }
}

const patchRecipe = (req, res)=>{
    const {title,description,urlImg,time,portions,categoryId,origin} = req.body
    const id = req.params.recipe_id
    recipesControllers.updateRecipe(id,{title,description,urlImg,time,portions,categoryId,origin})
        .then(data=>{
            if(data[0]){
                res.status(200).json({message:`Recipe with Id: ${id} edited succesfully`})
            }else{
                res.status(404).json({message: `Invalid Id`, id})

            }

        })
        .catch(err=>{
            res.status(400).json({message: err.message})
        })
}

const deleteRecipe = (req, res)=>{
    const id = req.params.recipe_id
    recipesControllers.deleteRecipe(id)
        .then(data =>{
            if(data){
                res.status(204).json()
            }else{
                res.status(404).json({message: 'Invalid Id', id})
            }
        })
        .catch(err =>{
            res.status(400).json({message: err.message})
        })
}


const getUserRecipes = (req, res) =>{
    const userId= req.user.id
    recipesControllers.getMyRecipes(userId)
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            res.status(400).json({message: err.message})
        })
}

module.exports = {
    getAllRecipes,
    getRecipeById,
    createRecipes,
    patchRecipe, 
    deleteRecipe,
    getUserRecipes
}