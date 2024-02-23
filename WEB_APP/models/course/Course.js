const mongoose = require('mongoose');
const courseSchema = mongoose.Schema({
    title: { type: String, required: true, minlength: 3, maxlength: 255 },
    discription: { type: String, required: true, minlength: 3, maxlength: 1100 },
    carriculum: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Folder' },
    duration: String,
    state: {
        type: String,
        required: true,
        enum: ['Pending', 'Posted', 'OutDated']
    },
    tags: { type: [mongoose.Schema.Types.ObjectId], required: false },
    picture: { type: mongoose.Schema.Types.Buffer, required: true },
    authors: { type: [mongoose.Schema.Types.ObjectId], required: true },
    price: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Price" },
    chat: { type: mongoose.Schema.Types.ObjectId, required: false, ref: "Chat" }
})


const Course = mongoose.model('Course', courseSchema)

exports.Course = Course