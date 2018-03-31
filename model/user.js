const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    type: {
        type: Number,
        require: true
    }
}, { collection: 'user' });    // 自定义集合名，避免表名出现复数

exports.user = mongoose.model('user', userSchema);
