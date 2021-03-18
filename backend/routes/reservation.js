const express = require(`express`)
const router = express.Router();

const {
    newReservation,
    getReservations,
    getSingleReservation,
    updateReservation,
    deleteReservation
} = require('../controllers/reservationController')

const { isAuthenticatedUser, authorizedRoles } = require('../middlewares/auth');

router.route('/reservations').get(getReservations);
router.route('/reservation/:id').get(getSingleReservation)
    .put(isAuthenticatedUser, authorizedRoles('admin'), updateReservation)
    .delete(isAuthenticatedUser, authorizedRoles('admin'), deleteReservation)
router.route('/reservation/new').post(newReservation);




module.exports = router;