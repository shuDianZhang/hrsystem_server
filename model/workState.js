const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workStateSchema = new Schema({
    _id: {
        type: Number,
        require: true
    },
    state: {
        type: String,
        require: true
    }
}, { collection: 'workstate' });    // 自定义集合名，避免表名出现复数

exports.workState = mongoose.model('workstate', workStateSchema);