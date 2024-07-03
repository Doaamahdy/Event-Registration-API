const mongoose = require('mongoose');
const event = require('./event');


const RegistrationSchema = new mongoose.Schema({

  userId:{
    type:mongoose.Types.ObjectId,
    ref:'User',
    required:[true,"Please Provide a User"],
  },
  eventId:{
    type:mongoose.Types.ObjectId,
    ref:'Event',
    required:[true,"Please Provide an Event"]
  },
  status:{
    type:String,
    enum:['registered','cancelled'],
    default:'registered',
  }
},{timestamps:true})

module.exports = mongoose.model('Registration',RegistrationSchema);