const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workRecordSchema = new Schema({
    good: {
        type: String,
        require: true
    },
    bad: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        require: true,
    },
    money: {
        type: Number,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true
    },
    date: {
        type: String,
        require: true
    }
}, { collection: 'workrecord' });    // 自定义集合名，避免表名出现复数

exports.workRecord = mongoose.model('workrecord', workRecordSchema);