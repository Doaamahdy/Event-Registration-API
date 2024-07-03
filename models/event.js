const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({

  title:{
    type:String,
    required:[true,"Please Provid a Title fo the Event"],
    minLength:5,
    maxLength:30,
  },
  description:{
    type:String,
    required:[true,"Please Provide a Description"],
    minLength:10,
  },
  location:{
    type:String,
    required:[true,'Please Provide a Location']
  },
  startTime:{
    type:Date,
  },
  endTime:{
    type:Date,
  }
},{timestamps:true})

module.exports = mongoose.model('Event',EventSchema);