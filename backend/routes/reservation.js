const express = require(`express`)
const router = express.Router();

const {
    newReservation, 
    getReservations,
    getSingleReservation,
    updateReservation,
    deleteReservation } = require('../controllers/reservationController')

router.route('/reservations').get(getReservations);
router.route('/reservation/:id').get(getSingleReservation)
                                .put(updateReservation)
                                .delete(deleteReservation)        
router.route('/reservation/new').post(newReservation);




module.exports = router;