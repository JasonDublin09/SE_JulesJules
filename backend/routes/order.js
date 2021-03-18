const express = require(`express`);
const router = express.Router();

const {
    newOrder,
    getSingleOrder,
    allOrders,
    updateOrder,
    deleteOrder

} = require('../controllers/orderController')

const { isAuthenticatedUser, authorizedRoles } = require('../middlewares/auth')

router.route('/order/new').post(newOrder);
router.route('/order/:id').get(getSingleOrder);

router.route('/admin/orders').get(isAuthenticatedUser, authorizedRoles('admin'), allOrders);
router.route('/admin/order/:id')
    .put(isAuthenticatedUser, authorizedRoles('admin'), updateOrder)
    .delete(isAuthenticatedUser, authorizedRoles('admin'), deleteOrder)

module.exports = router;