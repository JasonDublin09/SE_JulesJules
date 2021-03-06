const express = require(`express`);
const router = express.Router();

const {
    registerUser,
    loginUser,
    logout,
    forgotPassword,
    resetPassword,
    allUsers,
    updateUser,
    deleteUser

} = require('../controllers/authController')

const { isAuthenticatedUser, authorizedRoles } = require('../middlewares/auth')

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logout);

router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);

router.route('/admin/users').get(isAuthenticatedUser, authorizedRoles('admin'), allUsers)
router.route('/admin/user/:id')
    .put(isAuthenticatedUser, authorizedRoles('admin'), updateUser)
    .delete(isAuthenticatedUser, authorizedRoles('admin'), deleteUser)


module.exports = router;