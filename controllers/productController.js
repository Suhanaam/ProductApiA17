

const ProductData=require('../models/Product')//model ingoottu kondu vannu


const getProducts= async(req,res)=>{
    try {

        const products=await ProductData.find()
        console.log(products)
        res.status(200).json(products)
    } catch (error) {

        res.status(500).json({error:error.message})

        
    }
}

    const getproductById=async(req,res)=>{
        try {
            const  id=req.params.id
            const product=await ProductData.findById(id)
            if(!product)return res.status(404).json({message:'product not found'})
            res.status(200).json(product)
            
        } catch (error) {
            res.status(500).json({error:error.message})
            
        }
    }

    //res.send("getting all products")


    //create product function

    const createProduct=async(req,res)=>{

        try {
          
            const {name,price,description,image}=req.body
            const newProduct=new ProductData({name,price,description,image})
            await newProduct.save()

            res.status(201).json(newProduct)
                   
            
        } catch (error) {
            res.status(500).json({error:error.message})
            
        }
    }


    //update

    const updateProduct=async(req,res)=>{
        try {
            const productId=req.params.id
            const product =await ProductData.findByIdAndUpdate(productId,req.body,{new:true})
            if(!product)return res.status(404).json({message:'product not found'})
            res.status(200).json(product)
        } catch (error) {
            res.status(500).json({error:error.message})
            
        }
    }

//delete

const deleteProduct=async(req,res)=>{
    try {

        const productId=req.params.id
        const product=await ProductData.findByIdAndDelete(productId)
        if(!product)return res.status(404).json({message:'product not found'})
            res.status(200).json({message:"product delete successfully"})
        
    } catch (error) {
        res.status(500).json({error:error.message})
        
    }
}



module.exports={getProducts,getproductById,createProduct,updateProduct,deleteProduct}

//handling product details&controll