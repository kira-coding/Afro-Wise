const mongoose = require('mongoose');
const textSchema=new mongoose.Schema({
    type:{
        type : String,
        required : true,
        enum : ['Marked Down','Raw']
            },
    content:[String]
})



const Text = mongoose.model('Text',textSchema)

exports.Text=Text