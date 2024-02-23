const express = require('express');
const router = express.Router();
const { Teacher } = require('../../models/users/teacher');
const {Course} = require('../../models/course/Course')
const {Price} = require('../../models/course/Price')
const {Folder} = require('../../models/course/Folder')
const jwt = require('jsonwebtoken');
const config = require('config');
const _ = require("lodash");
const Joi = require('joi');
const { auth, getCookies } = require('../../middlewares/teacher.auth')


function validateCourse(object) {
    const validateSchema = Joi.object({
        title: Joi.string().min(3).max(255).required(),
        discription: Joi.string().min(3).max(1024).required(),
        picture: Joi.binary().required(),
        price: Joi.string().required(),
        price_freq: Joi.string()
    })
    return validateSchema.validate(object)
}

router.route('/create')
    .get(auth, (req, res) => {
        if (req.user) {
            console.log(req.user)
            res.render('course/create',{user:req.user})
            return
        }
        
        res.redirect('/teacher/login')
        return
    })
    .post(auth, async (req, res) => {
        if (req.user) {
            try {
                const payload = _.pick(req.body, ['title', 'discription', 'picture', 'price', 'price_freq'])
                validateCourse(payload)
                let price = new Price({ value: Number.parseFloat(payload.price), frequency: payload.price_freq })
                price = await price.save()
                let carriculum = new Folder({ discription: payload.discription, title: payload.title, duration: '0s' })
                carriculum=await carriculum.save()
                // TODO: Tag, Chat Models, Routes, Views
                let course = new Course(_.pick(payload, ['title', 'discription']))
                course.carriculum=carriculum._id
                course.state='Pending'
                course.picture= payload.picture
                course.author=req.user._id
                course.price=price._id
                
                course =await course.save()
                console.log(course._id,course)
                res.send(course)
                return
            }
            catch (err) {
                console.log(err)
                res.send(err)
                return
            }
            
        }
        console.log(req.body)
        res.redirect('/teacher/login')
        return
    })

module.exports=router

