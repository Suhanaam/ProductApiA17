const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const addUser = async (req, res) => {
    try {
        const { name, email, username, password } = req.body;

        // Validate input
        if (!name || !email || !username || !password) {
            return res.status(400).json({ error: "All fields (name, email, username, password) are required" });
        }

        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create user object
        const userItem = {
            name,
            email,
            username,
            password: hashedPassword,
            createdAt: new Date()
        };

        // Save user to database
        const user = new User(userItem);
        await user.save();

        // Return created user (excluding sensitive data like password)
        res.status(201).json({
            message: "User created successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                username: user.username,
                createdAt: user.createdAt
            }
        });
    } catch (error) {
        console.error(error); // Log for debugging
        res.status(500).json({ error: "An error occurred while creating the user" });
    }
};

//login
const login=async(req,res)=>{
    try {
        const {email,password}=req.body
        console.log({email})
        const user=await User.findOne({email:email})
        console.log({password})
        console.log({user})
        if(!user){
            return res.status(500).json({message:"user not found"})
        }
        console.log("user found")
        //authentication
        const isValid=await bcrypt.compare(password,user.password)
        console.log(user.password)

        console.log(isValid)
        if(!isValid){
            return res.status(500).json({message:"invalid credentials"})
        }
     //authorization
        let payload={user:email}
       const secretKey=process.env.JWT_SECRET_KEY
       let token=jwt.sign(payload,secretKey)
       res.status(200).json({message:"login successful",token:token})

    } catch (error) {
        
    }
}

module.exports = { addUser,login };
