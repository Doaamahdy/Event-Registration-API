const express = require('express');
const router = express.Router();
const registerEventRouter = require('./registerationEvent');
const auth = require('../middlewares/auth');
const {
    getAllEvents,
    createEvent,
    getEvent,
    deleteEvent,
    updateEvent,
    RegisterEvent,
} = require('../controllers/event');

router.route('/').get(getAllEvents).post(createEvent);
router.route('/:id')
    .get(getEvent)
    .delete(deleteEvent)
    .patch(updateEvent);
router.post('/:id/register',auth,RegisterEvent)    //make user register an event

module.exports = router;