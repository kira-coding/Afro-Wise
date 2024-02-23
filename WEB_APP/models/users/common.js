const mongoose = require('mongoose');
// const Joi = require('joi');


const OTPSchema = mongoose.Schema({
    phone: { type: String, minlength: 10, maxlength: 15, required: true },
    password: {
        type: String,
        minlength: 8,
        maxlength: 255,
        required: true
    },
    ref: {
        type: String,
        required: true,
        enum: ['Teacher', 'Student','Admin']
    },
    expirationDate: { type: mongoose.Schema.Types.Date, required: true }
})

const OTP = mongoose.model('OPT', OTPSchema)

exports.OTP = OTP;