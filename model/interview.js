const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const interviewSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    pass: {
        type: Boolean,
        require: true
    },
    reinterview: {
        type: Boolean,
        require: true
    }
}, { collection: 'interview' });    // 自定义集合名，避免表名出现复数

exports.interview = mongoose.model('interview', interviewSchema);