const mongoose = require('mongoose');
const itemSchema=new mongoose.Schema({
    type:{
        type : String,
        required : true,
        enum : ['Text','Image']
            },
    id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:this.type
    }
})
const scriptSchema = new mongoose.Schema({
    items_order:[itemSchema]
})


const Script = mongoose.model('Script', scriptSchema)

exports.Script = Script