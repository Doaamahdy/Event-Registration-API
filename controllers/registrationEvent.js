const Registration = require("../models/registration");
const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} = require("../errors/index");

const getAllRegistrations = async (req, res) => {
  const registrations = await Registration.find({
    userId: req.user.userId,
  }).sort("createdAt");
  res.status(StatusCodes.OK).json({ registrations });
};

const getRegistration = async (req, res) => {
  const {
    user: { userId },
    params: { id: eventId },
  } = req;
  const registration = await Registration.findOne({ _id: eventId, userId });
  if (!registration) {
    throw new NotFoundError(`Event wit id ${eventId} doesn't exist`);
  }
  res.status(StatusCodes.OK).json({ registration });
};

const deleteRegistration = async (req, res) => {
  const {
    user: { userId },
    params: { id: eventId },
  } = req;
  const registration = await Registration.findOneAndDelete({
    _id: eventId,
    userId,
  });
  if (!registration) {
    throw new NotFoundError(`Event wit id ${eventId} doesn't exist`);
  }
  res.status(StatusCodes.OK).json({ msg: "reservation deleted successfully" });
};

const updateRegistration = async (req, res) => {
  const {
    user: { userId },
    params: { id: eventId },
  } = req;
  const registration = await Registration.findByIdAndUpdate(
    { _id: eventId, userId },
    req.body,
    { runValidators: true ,new:true}
  );
  if (!registration) {
    throw new NotFoundError(`Event wit id ${eventId} doesn't exist`);
  }
  res.status(StatusCodes.OK).json({ registration });
};

module.exports = {
  getAllRegistrations,
  getRegistration,
  deleteRegistration,
  updateRegistration,
};
