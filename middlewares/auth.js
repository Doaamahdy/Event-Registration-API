const {
    CustomError,
    BadRequestError,
    UnauthenticatedError
} = require('../errors/index');

const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async(req,res,next)=>{
    const authHeaders = req.headers.authorization;
    if(!authHeaders || !authHeaders.startsWith){
        throw new UnauthenticatedError('Authentication Invalid');        
    }
    const token = authHeaders.split(' ')[1];
    try{
      const payload = jwt.verify(token,process.env.JWT_SECRET);
      req.user = {userId:payload.userId,name:payload.name}
      next();
    }catch(err){
        throw new UnauthenticatedError("Authentication Invalid");
    }

}

module.exports = auth;
