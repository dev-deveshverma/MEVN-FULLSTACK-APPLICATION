const router= require("express").Router();
const User= require("../../model/User/user.model");
const deleteKeys = require("../../utils/deleteKeys");

//!get request to get all the users
router.get("/",async(req,res)=>{
    try {
        const users= await User.find().select(["_id","fullName","email","createdAt","updatedAt"]).lean().exec();
        return res.status(200).send(users)
    } catch (error) {
        return res.status(500).send({message:error.message})
    }
})
//!get request to get single user
router.get("/:id",async(req,res)=>{
    try {
        const user= await User.findById(req.params.id).select(["_id","fullName","email","createdAt","updatedAt"]).lean().exec();
        return res.status(200).send(user)
    } catch (error) {
        return res.status(500).send({message:error.message})
    }
})
//!patch request to update user detail and delete if email and password from the req body
router.patch("/:id",async(req,res)=>{
    try {
        //! if email or password will be in the req body then throw error 
        if(req.body.email || req.body.password){
           return res.status(400).send({message:"Email and password can't be updated"})
        }
        //!updating the user info
        const updatedUser= await User.findByIdAndUpdate(req.params.id,req.body,{new:true}).select(['_id','fullName','createdAt',"updatedAt","email"]).lean().exec();
        //!if updateUser response is null then it will return error
        if(!updatedUser) return res.status(400).send({message:"Updation failed "} )
      
        return res.status(200).send(updatedUser)
        
    } catch (error) {
        return res.status(500).send({message:error.message})
    }
})
//!delete request to delete user
router.delete("/:id",async(req,res)=>{
    try {
        const deletedUser= await User.findByIdAndDelete(req.params.id).lean().exec();
        //!if user is not found then it will return error 
        if(!deletedUser) return res.status(400).send({message:"User not found"} )
        return res.status(200).send({message:"User deleted successfully",deletedUser:true})
    } catch (error) {
        return res.status(500).send({message:error.message})
    }
})



//import router 
module.exports=router