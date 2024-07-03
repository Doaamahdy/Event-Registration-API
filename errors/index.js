const CustomError = require('./custom-error');
const BadRequestError = require('./badRequest-error');
const NotFoundError = require('./notFound-error');
const UnauthenticatedError = require('./unauthenticated-error');


module.exports = {
    CustomError,
    BadRequestError,
    NotFoundError,
    UnauthenticatedError
}