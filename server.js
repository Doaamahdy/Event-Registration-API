const cors = require('cors');
require('dotenv').config();
require('express-async-errors');

const auth = require('./middlewares/auth');
// Create the app
const express = require("express");
const app = express();

app.use(cors());

// Connect database
const connectDB = require("./db/connect-db");

// Error handlers
const notFoundMiddleware = require('./middlewares/notFound');
const errorHandlerMiddleware = require('./middlewares/errorHandler');

// Routers
const authRouter = require('./routes/auth');
const eventRouter = require('./routes/event');
const registrationRouter = require('./routes/registerationEvent');

app.use(express.json());
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/events', eventRouter);
app.use('/api/v1/registrations', auth, registrationRouter);

// Error handling middlewares
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = 5000;
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        });
    } catch (err) {
        console.error(err);
    }
};

start();
