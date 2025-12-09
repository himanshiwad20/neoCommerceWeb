import categoryModel from '../models/categoryModel.js'
import slugify from 'slugify'

export const createCategoryController = async (req, res) => {
    try {
        const {name} = req.body
        if(!name) {
            return res.status(401).send({message: 'name is required'})
        }

        const existingCategory = await categoryModel.findOne({name})
        if(existingCategory) {
            return res.status(200).send({
                success: true,
                message: "Category already exixts"
            })
        }

        const category = await new categoryModel({name, slug:slugify(name)}).save()
        res.status(201).send({
            success: true,
            message: 'Category Created',
            category
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error in Create category"
        })
    }

}

export const updateCategoryController = async (req, res) => {
    try {
        const {id} = req.params
        const {name} = req.body

        const category = await categoryModel.findByIdAndUpdate(id, {name, slug:slugify(name)}, {new: true})
        res.status(201).send({
            success: true,
            message: "Category updated successfully!"
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: true,
            error,
            message: "error in update CategoryController"
        })
    }
}

export const getCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.find({})
        res.status(201).send({
            success: true,
            message: "All Categories found",
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            succes: false,
            message: "Error in getting all categories"
        })
    }
}

export const getSingleCategoryController = async (req, res) => {
    try {
        const {slug} = req.params

        const category = await categoryModel.findOne({slug})
        if(!category) {
            return res.status(401).send("Category not found")
        }
        res.status(201).send({
            success: true,
            message: "Single Category found",
            category
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: " Error in getSingleCategoryController",
            error
        })
    }
}

export const deleteCategoryController = async (req, res) => {
    try {
        const {id} = req.params
        await categoryModel.findByIdAndDelete(id)
        res.status(201).send({
            success: true,
            message: "Deleted category successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in deleteCategoryController"
        }),
        error
    }
} 