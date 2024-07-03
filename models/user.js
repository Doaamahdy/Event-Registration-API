const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const UserSchema = new mongoose.Schema({
  
    name:{
        type:String,
        required:[true,"Please Provide a Name"],
        minLength: 3,
        maxLength: 30,
    },
    email:{
        type:String,
        required:[true,"Please Provide an Email"],
        minLength:5,
        maxLength:50,
        unique:true,
        match: [
            /^\w+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/, // More concise and efficient email format validation
            "Please provide a valid email address (e.g., john.doe@example.com)",
          ],
    },
    password:{
        type:String,
        required:[true,"Please Provid a Pssword"],
        minLength:6,
    },

});
UserSchema.pre('save',async function(next){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();
})
UserSchema.methods.createJWT = function(){
  const token = jwt.sign({name:this.name,userId:this._id},process.env.JWT_SECRET,{expiresIn:'30d'});
  return token;
}
UserSchema.methods.comparePssword= async function(candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword,this.password);
    return isMatch;
  }  


module.exports = mongoose.model('User',UserSchema);