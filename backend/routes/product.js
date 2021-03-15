const express = require(`express`)
const router = express.Router();

const { getProducts, newProduct, getSingleProduct, updateProducts } = require('../controllers/productController')


router.route('/products').get(getProducts);
router.route('/product/:id').get(getSingleProduct);
router.route('/product/new').post(newProduct);
router.route('/product/new:id').post(updateProducts);


module.exports = router;