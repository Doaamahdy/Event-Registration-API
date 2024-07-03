const Event = require('../models/event');
const Registration = require('../models/registration'); 
const {StatusCodes} = require('http-status-codes');
const {NotFoundError,BadRequestError} = require('../errors/index');


const getAllEvents = async(req,res)=>{
  const events = await Event.find({}).sort('createdAt');
  res.status(StatusCodes.OK).json({events,count:events.length});

}

const createEvent = async (req,res)=>{
 
    const event = await Event.create(req.body);
    res.status(StatusCodes.CREATED).json({event});
}

const getEvent= async(req,res)=>{
    const eventId = req.params.id;
    const event = await Event.findOne({_id:eventId});
    if(!event){
      throw new NotFoundError(`job with id ${eventId} doesn't exist`);
    } 
    res.status(StatusCodes.OK).json({event});
}

const deleteEvent = async(req,res)=>{
   const eventId = req.params.id;
   const event = await Event.findOneAndDelete({_id:eventId});
   if(!event){
    throw new NotFoundError(`job with id ${eventId} doesn't exist`)
   }
   res.status(StatusCodes.OK).json({msg:"event deleted successfully"});
}

const updateEvent = async(req,res)=>{
  const eventId = req.params.id;
  const {title,description,location} = req.body;
  if(!title || !description || !location){
    throw new BadRequestError("You must provide title, description, location ");
  }
  const event = await Event.findByIdAndUpdate({_id:eventId},req.body,{new:true,runValidators:true});
  if(!event){
    throw new NotFoundError(`job with id ${eventId} doesn't exist`);
  }
  res.status(StatusCodes.OK).json({event});
}

const RegisterEvent = async(req,res)=>{
  const{user:{userId},params:{id:eventId}} = req;  
  const registration  = await Registration.create({
    userId,
    eventId
  });
  res.status(StatusCodes.CREATED).json({registration});  
}



module.exports = {
    getAllEvents,
    createEvent,
    deleteEvent,
    updateEvent,
    getEvent,
    RegisterEvent
}

