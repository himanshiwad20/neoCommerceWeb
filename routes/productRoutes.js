import express from 'express' 
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'
import { updateProductController, deleteProductController, getPhotoController, 
    getSingleProductController, createProductController, getProductsController, 
    filterProductsController, countProductsController, perPageProducts, searchProductController, 
    getSimilarProductsController, categoryWiseProductsController} from '../controllers/productController.js'
import formidable from 'express-formidable'

const router = express.Router()

router.post('/createProduct', requireSignIn, isAdmin, formidable(), createProductController)

router.get('/getProducts', getProductsController)

router.get('/getSingleProduct/:slug', getSingleProductController)

router.get('/getPhoto/:pid', getPhotoController)

router.delete('/deleteProduct/:pid', deleteProductController)

router.put('/updateProduct/:pid', requireSignIn, isAdmin, formidable(), updateProductController)

router.post('/filterProducts', filterProductsController)

router.get('/countProducts', countProductsController)

router.get('/perPageProducts/:page', perPageProducts)

router.get('/searchProduct/:keyword', searchProductController)

router.get('/similarProducts/:pid/:cid', getSimilarProductsController)

router.get('/categoryWiseProducts/:slug', categoryWiseProductsController)

// router.get('/braintree/token', braintreeTokenController)

export default router