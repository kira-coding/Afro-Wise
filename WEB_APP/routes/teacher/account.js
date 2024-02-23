//==================Imports===============
const express = require('express');
const router = express.Router();
const { Teacher, validateTeacher } = require('../../models/users/teacher');
const jwt = require('jsonwebtoken');
const config = require('config');
const _ = require("lodash");
const Joi = require('joi');
const {auth , getCookies}= require('../../middlewares/teacher.auth')
//=================end====================


// TODO: create an auth  middleware function which will protect teacher routes


// teacher account creation page
const signup = async (req, res) => {

/*
    Here teachers will create thier account
    

    TODO: set OTP  inorder to allow only selected users to create account;

*/
    const key = config.get("JWT-secret-key")
    try {
        let payload = _.pick(req.body, ['first_name', 'middle_name', 'sur_name', 'user_name', 'email', 'password', 'gender',])
        const obj = jwt.verify(req.body['x-otp-auth-token'], key)

        payload.phone = obj.phone

        validateTeacher(payload)

        const user_name_match = await Teacher.find(_.pick(payload, ['user_name']));
        const email_match = await Teacher.find(_.pick(payload, ['email']));
        if (user_name_match.length > 0) {
            console.log(user_name_match)
            res.status(403).send("a user with username: " + payload.user_name + " already exists")
            return;
        }
        if (email_match.length > 0) {
            console.log(email_match)
            res.status(403).send("a user with email:" + payload.email + "already exists")
            return;
        }

        const teacher = new Teacher(payload)
        await teacher.save()
        const token = jwt.sign({ _id: teacher._id, email: teacher.email, username: teacher.username }, key)
        res.status(201).set('x_teacher_auth_token', token).send(teacher)

    }
    catch (err) {
        res.status(400).send(err)
        // console.log(err)
        return;
    }
}
router.get('/signup', (req, res) => {

    res.status(200).render('teacher/login')
    
})

router.post('/signup', signup);

function validateLoginuser(object) {
    const validationSchema = Joi.object({
        user_name: Joi.string().min(3).max(50).required(),
        password: Joi.string().min(8).max(255).required()

    })
    const validationEmailSchema = Joi.object({
        email: Joi.string().min(3).max(50).email().required(),
        password: Joi.string().min(8).max(255).required()

    })

    if (object.email) {
        return Joi.assert(object, validationEmailSchema)
    }
    return Joi.assert(object, validationSchema)
}
router.get('/login',auth, (req, res) => {
    if(!req.user){
        res.render('teacher/login',{err:false})
        return
    }
    console.log(req.user)
    res.redirect(200,'/teacher/dashboard')
    return;
})
router.get('/logout', (req, res) => {
    res.clearCookie('x_teacher_auth_token')
    res.clearCookie('x-teacher-auth-token')
    res.redirect('login')
})


router.post('/login', async (req, res,next) => {
    res.clearCookie('x_teacher_auth_token')
    res.clearCookie('x-teacher-auth-token')
    try {
        validateLoginuser(req.body)
        if (req.body.user_name) {

            const teacher = await Teacher.findOne({user_name:req.body.user_name})
            if(teacher){
                if(teacher.password===req.body.password){
                    // TODO: encapsulate the bcrypt and jwt generation in teacher object
                    // console.log('hi')
                    res.cookie('x_teacher_auth_token',teacher.generateAuthToken(), { maxAge: 900000, httpOnly: true })
                    res.redirect('dashboard')
                    return;
                }
            }
            // console.log(req.body)
            res.status(400).render('teacher/login',{err:true})
            return;
        }
        else if(req.body.email){

            const teacher = await Teacher.findOne({email:req.body.email})
            if(teacher){
                if(teacher.password===req.body.password){
                    // TODO: encapsulate the bcrypt and jwt generation in teacher object


                    res.cookie('x_teacher_auth_token',teacher.generateAuthToken(), { maxAge: 900000, httpOnly: true })
                    res.redirect('dashboard')
                    return;
                }
            }

            res.status(400).render('teacher/login',{err:true})
            return;
        }
    }
     catch (err) {
        console.log(err)
        res.status(400).render('teacher/login',{err:true})
        return;
    }
})
router.get('/dashboard', auth,(req, res,next) => {

    console.log(req.user)
    if(!req.user){
        res.redirect('/teacher/login')
        return
    }
    res.render('teacher/dashboard',{user:req.user})
    return
})


exports.account = router;
exports.signup = signup;
