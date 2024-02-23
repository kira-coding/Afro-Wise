const mongoose = require('mongoose');
const itemSchema=new mongoose.Schema({
    type:{
        type : String,
        required : true,
        enum : ['Folder','Topic']
            },
    id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:function (){
            return this.type
        }
    }
})

const folderSchema = new mongoose.Schema({
    title : { type : String, required:true ,minlength:3,maxlength:255},
    duration : String,
    discription: String,
    item_order:[itemSchema]
})

const Folder = mongoose.model('Folder',folderSchema)

exports.Folder=Folder