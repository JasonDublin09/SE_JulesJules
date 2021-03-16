const Product = require('../models/product')
const ErrorHandler = require('../utils/errorHandler');
const APIFeatures = require('../utils/apiFeatures');

//     CREATE A  product = api/v1/product/new
exports.newProduct = async(req, res, next) => {

    const product = await Product.create(req.body)

    res.status(201).json({
        success: true,
        product
    })
}

//    GET ALL    product = api/v1/products
//    GET ALL    product = api/v1/products?keyword=footlong
exports.getProducts = async(req, res, next) => {

    const resPerPage = 8;
    //counts all documents/products | will be used for frontend
    const productCount = await Product.countDocuments()

    const apiFeatures = new APIFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination(resPerPage)

    const products = await apiFeatures.query;
    //const products = await Product.find();

    res.status(200).json({
        success: true,
        count: products.length,
        productCount,
        products
    })
}

//    GET SINGLE product => api/v1/product/:id

exports.getSingleProduct = async(req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Product not found :( ', 404));
    }

    res.status(200).json({
        success: true,
        product
    })
}

//    UPDATE    product = api/v1/admin/product/:id
exports.updateProducts = async(req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Product not found :( ', 404));
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        product
    })
}

//     DELETE   product = api/v1/admin/products/:id
exports.deleteProducts = async(req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Product not found :( ', 404));
    }

    await product.remove();

    res.status(200).json({
        success: true,
        message: ('Product is deleted')
    })
}