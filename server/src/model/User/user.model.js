//!imports 
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
//!user schema 
const userSchema = new mongoose.Schema({
    fullName:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
},{
    timestamps:true,
    versionKey:false
})
// hashing the password before saving in db
userSchema.pre("save",function(next){
    // if the password is already hashed then just return
    if(!this.isModified("password")){
        return next();
    }
    const hash= bcrypt.hashSync(this.password,8);
    this.password=hash;
    return next();
    // else we do the hashing
})

// adding a method to check the password
userSchema.methods.checkPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  // export user model 
    module.exports=mongoose.model("user",userSchema)