import express from 'express'
import { isAdmin, requireSignIn } from './../middlewares/authMiddleware.js';
import { deleteCategoryController, getSingleCategoryController, getCategoryController, createCategoryController, updateCategoryController } from '../controllers/categoryController.js';

const router = express.Router()

router.post('/createCategory', requireSignIn, isAdmin, createCategoryController) 

router.put('/updateCategory/:id', requireSignIn, isAdmin, updateCategoryController)

router.get('/getCategory', getCategoryController)

router.get('/getSingleCategory/:slug', getSingleCategoryController)

router.delete('/deleteCategory/:id', requireSignIn, isAdmin, deleteCategoryController)

export default router 