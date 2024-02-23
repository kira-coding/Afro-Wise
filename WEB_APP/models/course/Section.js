const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
    title: { type: String, required: true, minlength: 1, maxlength: 255 },
    type: {
        type: String,
        required: true,
        enum: ['Video', 'Script', 'Quize']

    },
    topic:{type:mongoose.Schema.Types.ObjectId,ref:'Topic',required:true},
    content: { type: mongoose.Schema.Types.ObjectId, ref: this.enum,required:true },

})


const Section = mongoose.model('Section', sectionSchema)

exports.Section = Section