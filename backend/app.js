const express = require('express');
const app = express();


const errorMiddleware = require ('./middlewares/errors')
app.use(express.json());

// Imports all routes
const products = require('./routes/product')
const reservations = require('./routes/reservation')
app.use('/api/v1', products)
app.use('/api/v1', reservations)


// middleware to handle errors
app.use(errorMiddleware);


module.exports = app