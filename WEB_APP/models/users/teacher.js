const mongoose = require('mongoose')
const Joi = require('joi')
const JWT=require('jsonwebtoken')
const config = require('config')
const teacherSchema = mongoose.Schema({
    first_name: { type: String, required: true, minlength: 3, maxlength: 255 },
    middle_name: { type: String, required: true, minlength: 3, maxlength: 255 },
    sur_name: { type: String, required: true, minlength: 3, maxlength: 255 },
    email: { type: String, required: true, maxlength: 255, unique: true },
    phone: { type: String, minlength: 10, maxlength: 15, required: true, unique: true },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female']
    },
    user_name: { type: String, required: true, minlength: 3, maxlength: 255, unique: true },
    password: { type: String, required: true, maxlength: 555 },
    rating: {
        type: Number,
        min: 0,
        max: 10,
        required: false
    },
    lock: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'locked',
        required: false
    }
})

teacherSchema.methods.generateAuthToken= function (){
    const payload = {
        email:this.email,
        phone:this.phone,
        user_name:this.user_name,
        first_name:this.first_name,
        _id:this._id
    }
    return JWT.sign(payload,config.get('JWT-secret-key'))
}

const Teacher = mongoose.model('Teacher', teacherSchema)
function validateTeacher(teacher) {
    const schema = Joi.object({
        first_name: Joi.string().min(3).required().max(115),
        middle_name: Joi.string().min(3).max(115).required(),
        sur_name: Joi.string().min(3).max(115).required(),
        email: Joi.string().max(255).email().required(),
        gender: Joi.alternatives('male', 'female'),
        user_name: Joi.string().min(3).max(255).required(),
        password: Joi.string().min(8).max(255).required(),
        rating: Joi.number().min(0).max(10),
        phone: Joi.string().min(10).max(15).required()
    })
    const result = Joi.assert(teacher, schema)
    // console.log(result)
    return result

}
exports.Teacher = Teacher;
exports.validateTeacher = validateTeacher;
