const express = require(`express`);
const router = express.Router();

const {
    getProducts,
    newProduct,
    getSingleProduct,
    updateProducts,
    deleteProducts
} = require('../controllers/productController')

const { isAuthenticatedUser, authorizedRoles } = require('../middlewares/auth');

router.route('/products').get(getProducts);
router.route('/product/:id').get(getSingleProduct);
router.route('/admin/product/:id')
    .put(isAuthenticatedUser, authorizedRoles('admin'), authorizedRoles('admin'), updateProducts)
    .delete(isAuthenticatedUser, authorizedRoles('admin'), deleteProducts);

router.route('/admin/product/new').post(isAuthenticatedUser, authorizedRoles('admin'), newProduct);



module.exports = router;