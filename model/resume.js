const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resumeSchema = new Schema({
    _id: {
        type: String,
        require: true
    },
    aboutMyself: {
        type: String,
        require: true
    },
    birthday: {
        type: String,
        require: true
    },
    city: {
        type: String,
        require: true
    },
    collage: {
        type: String,
        require: true
    },
    degree: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    goodResult: {
        type: Array,
        require: true
    },
    graduation: {
        type: String,
        require: true
    },
    headImageUrl: {
        type: String,
        require: true
    },
    hightDegree: {
        type: String,
        require: true
    },
    job: {
        type: String,
        require: true
    },
    jobState: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    prefix: {
        type: String,
        require: true
    },
    profess: {
        type: String,
        require: true
    },
    projectExperience: {
        type: Array,
        require: true
    },
    sex: {
        type: String,
        require: true
    },
    salary: {
        type: String,
        require: true
    },
    website: {
        type: String,
        require: true
    },
    workExperience: {
        type: Array,
        require: true
    },
    worktime: {
        type: String,
        require: true
    }
}, { collection: 'resume' });    // 自定义集合名，避免表名出现复数

exports.resume = mongoose.model('resume', resumeSchema);