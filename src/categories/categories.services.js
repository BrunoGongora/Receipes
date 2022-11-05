const e = require('express')
const categoriesControllers = require('./categories.controllers')

const getAllCategories = (req, res)=>{
    categoriesControllers.getAllCategories()
    .then(data=>{
        res.status(200).json(data)
    })
    .catch(err=>{
        res.status(400).json({message: err.message})
    })
}

const getCategoryById = (req,res)=>{
    const id = req.params.id
    categoriesControllers.getCategoriesById(id)
    .then(data=>{
        if(data){
            res.status(200).json(data)
        }else{
            res.status(400).json({message : `Id: ${id}, not exist`})
        }

    })
    .catch(err=>{
        res.status(400).json({message: err.message})

    })
}
const postCategory = (req,res)=>{
    
    const userId = req.user.id;
    const name  = req.body
    if(name){
    categoriesControllers.createCategories(name,userId)
        .then(data=>{
            res.status(201).json(data)
        })
        .catch(err=>{
            res.status(400).json({message: err.message})
        })
    }else{
        res.status(400).json({
            message: 'invalid data',
            fields:{
                name:'string'
            }
        })
    }

}

const deleteCategories = (req, res)=>{
    const userId = req.user.id
    const id = req.params.id
    categoriesControllers.deleteCategories(id,userId)
        .then(data=>{
            if(data){
                res.status(204).json(data)
            }else{
                res.status(404).json({message:'Invalid Id'})
            }

    })
    .catch(err=>{
        res.status(400).json({message: err.message})
    })
    }


module.exports ={
    getAllCategories,
    getCategoryById,
    postCategory,
    deleteCategories
}