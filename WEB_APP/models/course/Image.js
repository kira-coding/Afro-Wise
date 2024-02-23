const mongoose = require('mongoose');
const imageSchema=new mongoose.Schema({
    type:{
        type : String,
        required : true,
        enum : ['gif','image']
            },
    content:mongoose.Schema.Types.Buffer
})



const Image = mongoose.model('Image',imageSchema)

exports.Image=Image