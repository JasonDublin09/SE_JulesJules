const User = require('../models/user');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');



// Register a user   => /api/v1/register
exports.registerUser = catchAsyncErrors(async(req, res, next) => {

    const { username, email, password } = req.body;

    const user = await User.create({
        username,
        email,
        password,
    })

    sendToken(user, 200, res)


})

// Login => /api/v1/login
exports.loginUser = catchAsyncErrors(async(req, res, next) => {
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

    sendToken(user, 200, res)
})

// Forgot Password => /api/v1/password/forgot
exports.forgotPassword = catchAsyncErrors(async(req, res, next) => {

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHandler('User not found with this email', 401));
    }

    // Get reset token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    // Send email to user
    // Create reset password url
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;

    const message = `Your password reset token is: \n\n${resetUrl}\n\nIf you have not requested this email, then please disregard this.`

    try {

        await sendEmail({
            email: user.email,
            subject: 'Hulyas and Marias Password Reset',
            message


        })

        res.status(200).json({
            success: true,
            message: `Email sent to: ${user.email}`
        })

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler(error.message, 500));
    }

})

// Reset Password  => /api/v1/password/reset/:token
exports.resetPassword = catchAsyncErrors(async(req, res, next) => {

    // Hash URL token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })

    if (!user) {
        return next(new ErrorHandler('Password reset token is invalid or has been expired', 400))
    }

    if (req.body.password !== req.body.confirmPassword) {

        return next(new ErrorHandler('Password does not match', 400))
    }


    // Setup new password
    user.password = req.body.password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res)


})

// Logout user  => /api/v1/logout
exports.logout = catchAsyncErrors(async(req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'Logged out'
    })

})