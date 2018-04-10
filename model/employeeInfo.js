const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeInfoSchema = new Schema({
    _id: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    sex: {
        type: String,
        require: true
    },
    nation: {
        type: String,
        require: true
    },
    idnumber: {
        type: String,
        require: true
    },
    borndate: {
        type: String,
        require: true
    },
    marriage: {
        type: String,
        require: true
    },
    home: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    degree: {
        type: String,
        require: true
    },
    collage: {
        type: String,
        require: true
    },
    graduation: {
        type: String,
        require: true
    },
    dept: {
        type: Number,
        require: true
    },
    job: {
        type: Number,
        require: true
    },
    honor: {
        type: Array,
        require: true
    }
}, { collection: 'userinfo' });    // 自定义集合名，避免表名出现复数

exports.employeeInfo = mongoose.model('userinfo', employeeInfoSchema);