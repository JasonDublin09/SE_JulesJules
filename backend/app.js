const express = require('express');
const app = express();

const cookieParser = require('cookie-parser')
const errorMiddleware = require('./middlewares/errors')

app.use(express.json());
app.use(cookieParser());

// Imports all routes
const products = require('./routes/product')
const reservations = require('./routes/reservation')
const auth = require('./routes/auth')
const order = require('./routes/order')


app.use('/api/v1', products)
app.use('/api/v1', reservations)
app.use('/api/v1', auth)
app.use('/api/v1', order)


// middleware to handle errors
app.use(errorMiddleware);


module.exports = app