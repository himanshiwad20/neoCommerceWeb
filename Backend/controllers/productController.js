import fs from 'fs'
import productModel from '../models/productModel.js'
import categoryModel from '../models/categoryModel.js'
import slugify from 'slugify'

// var gateway = new SiBraintree.BraintreeGateway({
//     environment: braintree.Environment.sandbox,
//     mearchantId: process.env.BRAINTTREE_MERCHANT_ID,
//     publicKey: process.env.BRAINTREE_PUBLIC_KEY,
//     privateKey: process.env.BRAINTREE_PRIVATE_KEY
// })

export const createProductController = async (req, res) => {
    try {
        const {name, description, price, category, quantity, shipping} = req.fields
        const {photo} = req.files

        switch(true) {
            case !name: 
                return res.status(200).send({message: "name is required"})
            case !description:
                return res.status(200).send({message: "description is required"})
            case !price:
                return res.status(200).send({message: "price is required"})
            case !category:
                return res.status(200).send({message: "category is required"})
            case !quantity:
                return res.status(200).send({message: "quantity is required"})
            case photo && photo.size > 100000:
                return res.status(200).send({message: "photo is required and should be less than 1MB"})
        }

        const product = new productModel({...req.fields, slug:slugify(name)})
        if(photo) {
            product.photo.data = fs.readFileSync(photo.path)
            product.photo.contentType = photo.type
        }

        await product.save()

        res.status(201).send({
            success: true,
            message: "Product created successfully",
            product
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in CreateProductController",
            error
        })
    }
}

export const getProductsController = async(req, res) => {
    try {
        const products = await productModel.find({}).populate('category').select("-photo").limit(10).sort({createdAt: -1})
        // if(!products) {
        //     return res.status(200).send({
        //         success: false,
        //         message: "Products not found",
        //         products
        //     })
        // }

        res.status(201).send({
            success: true,
            count: products.length,
            message: "All products list",
            products
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in getProductsController",
            error
        })
    }
}

export const getSingleProductController = async (req, res) => {
    try {
        const {slug} = req.params

        const product = await productModel.findOne({slug}).select("-photo").populate('category')

        if(!product) {
            return res.status(200).send({
                success: false,
                message: "Product not available"
            })
        }

        res.status(200).send({
            success: true,
            message: "Product available",
            product
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "error in getSingleProductController",
            error
        })
    }
}

export const getPhotoController = async(req, res) => {
    try {
        // const {pid} = res.params

        const productPhoto = await productModel.findById(req.params.pid).select("photo")
        if(productPhoto.photo.data) {
            res.set('Content-type', productPhoto.photo.contentType)
            return res.status(200).send(productPhoto.photo.data)
        }

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in getPhotoController",
            error
        })
    }
}

export const deleteProductController = async(req, res) => {
    try {
        const product = await productModel.findByIdAndDelete(req.params.pid).select("-photo")

        res.status(200).send({
            success: true,
            message: "Product deleted successfully",
            product
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in deleteProductController",
            error
        })
    }
}

export const updateProductController = async(req, res) => {
    try {
        const {name, description, price, category, quantity, shipping} = req.fields
        const {photo} = req.files

        switch(true) {
            case !name: 
                return res.status(200).send({message: "name is required"})
            case !description:
                return res.status(200).send({message: "description is required"})
            case !price:
                return res.status(200).send({message: "price is required"})
            case !category:
                return res.status(200).send({message: "category is required"})
            case !quantity:
                return res.status(200).send({message: "quantity is required"})
            case photo && photo.size > 100000:
                return res.status(200).send({message: "photo is required and should be less than 1MB"})
        }

        const product = await productModel.findByIdAndUpdate(req.params.pid, {...req.fields, slug:slugify(name)}, {new: true})
        if(photo) {
            product.photo.data = fs.readFileSync(photo.path)
            product.photo.contentType = photo.type
        }

        await product.save()
        
        res.status(201).send({
            success: true,
            message: "Product updated successfully",
            product
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in UpdateProductController",
            error
        })
    }
}

export const filterProductsController = async(req, res) => {
    try {
        const {checked=[], radio=null} = req.body
        let args={}
        if(checked.length>0) {
            args.category= { $in: checked }
        }
        if(radio) {
            args.price = {$gte: radio[0], $lte: radio[1]}
        }
        const products = await productModel.find({...args})

        res.status(200).send({
            success: true,
            products
        })

    } catch(error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: "Error in filtering products",
            error
        })
    }
} 

export const countProductsController = async (req, res) => {
    try {
        const count = await productModel.find({}).estimatedDocumentCount()
        res.status(200).send({
            success:true,
            count
        })

    } catch (error) {
        console.log(error)
        res.status(400).send({
            success:false,
            message: "error in getting products count",
            error
        })
    }
}

export const perPageProducts = async (req, res) => {
    try {
        const perPage = 6
        const page=req.params.page ? req.params.page : 1
        const products = await productModel.find({}).select('-photo').skip((page-1)*perPage).limit(perPage).sort()

        res.status(200).send({
            success: true,
            products
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success:false,
            message: "Error in accessing products per page",
            error
        })
    }
}

export const searchProductController =  async (req, res) => {
    try {
        const {keyword} =req.params
        const products = await productModel.find({
            $or: [
                {name: {$regex: keyword, $options: 'i'}},
                {description: {$regex: keyword, $options: 'i'}}
            ]
        }).select('-photo')
        res.json(products)
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: "Error in search porduct api"
        })
    }
}

export const getSimilarProductsController = async (req, res) => {
    try {
        const {pid, cid} = req.params

        const products = await productModel.find({
            category: cid,
            _id: {$ne: pid}
        }).select('-photo').limit(3).populate('category')
        res.status(200).send({
            success: true,
            messgae: 'Got similar products',
            products
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: "Error in getting similar products",
            error
        })
    }
}

export const categoryWiseProductsController = async (req, res) => {
    try {
        // const slug = req.params
        const category = await categoryModel.findOne({slug: req.params.slug})

        const products = await productModel.find({category}).populate('category')
        
        res.status(200).send({
            success: true,
            message: "All Products from single category found",
            category,
            products
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            succes: false,
            message: "Error in getting products category wise",
            error
        })
    }
}