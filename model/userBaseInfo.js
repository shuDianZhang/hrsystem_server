const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userBaseInfoSchema = new Schema({
    _id: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    hasHeadImg: {
        type: Boolean,
        require: true
    }
}, { collection: 'userbaseinfo' });    // 自定义集合名，避免表名出现复数

exports.userBaseInfo = mongoose.model('userbaseinfo', userBaseInfoSchema);