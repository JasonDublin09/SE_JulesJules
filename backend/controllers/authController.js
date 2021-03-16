const User = require('../models/user')
const ErrorHandler = require('../utils/errorHandler')


// Register a user   => /api/v1/register
exports.registerUser = (async(req, res, next) => {

    const { username, email, password } = req.body;

    const user = await User.create({
        username,
        email,
        password,
    })

    res.status(201).json({
        success: true,
        user
    })

    sendToken(user, 200, res)


})

// Login => /api/v1/login
exports.loginUser = (async(req, res, next) => {
    const { username, password } = req.body;

    // check if username and password is entered by user
    if (!username || !password) {
        return next(new ErrorHandler('Please enter Username & Password', 400));
    }

    // Finding user in database
    const user = await User.findOne({ username }).select('+password');

    if (!user) {
        return next(new ErrorHandler('Invalid Username or Password', 401));
    }

    // Checks if password is correct or not
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler('Invalid Username or Password', 401));
    }

    const token = user.getJwtToken();

    res.status(200).json({
        success: true,
        token
    })
})