require("dotenv").config();
const User= require("../../model/User/user.model");
const jwt= require("jsonwebtoken");
const deleteKeys = require("../../utils/deleteKeys");
// function to create new token for the new user
const newToken=(user)=>{
    return jwt.sign({user},`${process.env.JWT_SECRET_KEY}`)
}
//!register controller
const register= async (req,res)=>{

    let {fullName, email, password} = req.body;
    let errors = {}; 
    if(!fullName){
        errors.fullName = "The FullName is required!";
    }
    if(!email){
        errors.email = "The Email is required!";
    }
    if(!password){
        errors.password = "The Password is required!";
    } else if (password.length < 8){
        errors.password = "The Password length must be minimum of 8 characters!";
    } 
    if(Object.keys(errors).length > 0){
        return res.status(400).send({errors});
    }

    try {
        // we wil try to find user with the email id 
         let user= await User.findOne({email:req.body.email} ).lean().exec();
        //  if the  user is found then it is an error 
        // it means this email has already registered with the previous user
        if(user){
            return res.status(400).send({message:"The email address already exist!"});
        }

        // if the use is not found then we will create new user with email and password
        user= await User.create(req.body);
    
        // then we will crete a token to that user
        const token= newToken(user); // calling the token function to generate token
        // then return the token to the user
        return res.status(201).send({message:"Registration Successfull",token})
    } catch (error) {
        return res.status(500).send(error.message)
    }
}
//!login controller
const login= async(req,res)=>{

    let { email, password} = req.body;
    let errors = {}; 
    if(!email){
        errors.email = "The Email is required!";
    }
    if(!password){
        errors.password = "The Password is required!";
    }  
    if(Object.keys(errors).length > 0){
        return res.status(400).send({errors});
    }

    try {
        //  first we will find the user by email id
        const user= await User.findOne({email:req.body.email}).exec();

        // if user is not found then it's a error
        if(!user){
            return res.status(400).send({message:"User dose not exits!"})
        }
        // if user found then we will match the password and create a new token 
        const match= user.checkPassword(req.body.password);
        if(!match){
            return res.status(400).send({message:"Invalid email or password. Please try again."})
        }
        // then we will crete a token to that user
        const token= newToken(user); // calling the token function to generate token
       // delete password key from the user model response 
         const updatedUser= deleteKeys(user.toObject(),'password')
        return res.status(201).send({user:updatedUser,token})

    } catch (error) {
        return res.send(error.message)
    }
}
//!exporting the controllers
module.exports={register,login}