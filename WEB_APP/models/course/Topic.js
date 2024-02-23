const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
    title : { type : String, required:true ,minlength:3,maxlength:255},
    duration : String,
    exp:Number,
    completion:Boolean,
    section_order:[mongoose.Schema.Types.ObjectId]

    
})


const Topic = mongoose.model('Topic',topicSchema)

exports.Topic=Topic