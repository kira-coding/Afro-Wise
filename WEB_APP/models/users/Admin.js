const mongoose = require('mongoose');



const adminSchema = mongoose.Schema({
    first_name : { type : String, required:true ,minlength:3,maxlength:255},
    middle_name : {type:String,required:true,minlength:3,maxlength:255},
    sur_name : {type:String,required:true,minlength:3,maxlength:255},
    email : {type:String,required:true,minlength:11,maxlength:255},
    gender : {
        type : String,
        required : true,
        enum : ['male','female']},
    user_name : {type:String,required:true,minlength:3,maxlength:255},
    password : {type:String,required:true,minlength:30,maxlength:555},
    permissions:{type:JSON,required:true}
    
    });
const Admin = mongoose.model('Admin',adminSchema);
