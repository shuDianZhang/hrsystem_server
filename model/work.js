const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clockInSchema = new Schema({
    username: {
        type: String,
        require: true
    },
    starttime: {
        type: String,
        require: true
    },
    endtime: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        require: true
    }
}, { collection: 'clockin' });    // 自定义集合名，避免表名出现复数

exports.clockIn = mongoose.model('clockin', clockInSchema);