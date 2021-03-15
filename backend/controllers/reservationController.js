const Reservation = require('../models/reservation')
const ErrorHandler = require('../utils/errorHandler');

//     create Reservation  product = api/v1/reservation/new

exports.newReservation = async (req, res, next) => {
    
    const reservation = await Reservation.create(req.body)

    res.status(201).json({
        success: true,
        reservation
    })
}

//    GET ALL  reservation = api/v1/reservations
exports.getReservations = async (req, res, next) => {

    const reservations = await Reservation.find();

    res.status(200).json({
        success: true,
        count: reservations.length,
        reservations
    })
}

//    GET SINGLE Reservation => api/v1/reservation/:id

exports.getSingleReservation = async (req, res, next) => {

    const reservation = await Reservation.findById(req.params.id);

    if(!reservation){
        return next(new ErrorHandler('Reservation not found :( ', 404));        
    }

    res.status(200).json({
        success: true,
        reservation
    })
}

//    UPDATE   reservation = api/v1/admin/reservation/:id
exports.updateReservation = async (req, res, next) => {

    let reservation = await Reservation.findById(req.params.id);

    if(!reservation){
        return next(new ErrorHandler('Reservation not found :( ', 404));
    }

    reservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        reservation
    })
}

//     DELETE  reservation = api/v1/admin/reservation/:id
exports.deleteReservation = async (req, res, next) => {

    const reservation = await Reservation.findById(req.params.id);

    if(!reservation){
        return next(new ErrorHandler('Reservation not found :( ', 404));
    }

    await reservation.remove();

    res.status(200).json({
        success: true,
        message: ('Reservation is deleted')
    })
}
