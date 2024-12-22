const mongoose=require('mongoose')

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        index:true
    },//veenamenkil constrains aayttum index set cheyyam eg:name{ type:string,requird:true,index:true} inganeyum kodukkam
    username:String,
    email:String,
    password:String,
    createdAt:Date
})

//to set index
//userSchemaSchema.index({name:1})

module.exports=mongoose.model('users',userSchema)