const mongoose = require('mongoose')

// for reservation needs confirmation
//- date 
//- contact info
//- orders (comment box)

const reservationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter Name']
    },
    order: {
        type: String,
        required: [true, 'Please enter your request order']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email']
    },
    contact: {
        type: String,
        required: [true, 'Please enter your contact number']
    },
    date: {
        type: String,
        required: [true, 'Please enter your reservation date']
    }  
})

module.exports = mongoose.model('Reservation', reservationSchema)