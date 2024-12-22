const mongoose=require('mongoose')

const productSchema= new mongoose.Schema({
    name:String,//veenamenkil constrains aayttum index set cheyyam eg:name{ type:string,requird:true,index:true} inganeyum kodukkam
    price:Number,
    image:String,
    description:String
})

//to set index
productSchema.index({name:1})

module.exports=mongoose.model('product',productSchema)