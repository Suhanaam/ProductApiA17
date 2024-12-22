const express=require('express')
const pRouter=express.Router()
const {getProducts,getproductById,createProduct,updateProduct,deleteProduct}=require('../controllers/productController')



//localhost:3000/products
pRouter.get('/',getProducts)

//product controllerilaaanu eee getproduct function ullath.

//id vech edukkan
pRouter.get('/:id',getproductById)

//create product

pRouter.post('/',createProduct)

//update product
pRouter.patch('/:id',updateProduct)

//delete product

pRouter.delete('/:id',deleteProduct)


module.exports=pRouter

//handling routing