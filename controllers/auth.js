const User = require('../models/user');
const {StatusCodes} = require('http-status-codes');
const {BadRequestError,UnauthenticatedError} = require('../errors/index');


const registerUser = async(req,res)=>{
    const newUser = await User.create({...req.body});
    const token = newUser.createJWT();
    res.status(StatusCodes.CREATED).json({user:{name:newUser.name,email:newUser.email},token})
}

const loginUser= async(req,res)=>{
    const {email,password} = req.body;
    //check if email and password are provided
    if(!email || !password){
        throw new BadRequestError("Please Provide Email and Password");
    }
    //check if the email existgs
    const foundUser = await User.findOne({email});
    if(!foundUser){
        throw new UnauthenticatedError("Invalid Credientials");
    }
    //compare the password
    const isPasswordCorrect = await foundUser.comparePssword(password);
    console.log(isPasswordCorrect);
    if(!isPasswordCorrect){
        throw new UnauthenticatedError("Invalid Credientials2"); 
    }
    //create token
    const token = await foundUser.createJWT();
    //send the response
    res.status(StatusCodes.OK).json({user:{name:foundUser.name},token})
}

module.exports = {
    registerUser,
    loginUser
}
