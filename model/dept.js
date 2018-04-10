const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deptSchema = new Schema({
    _id: {
        type: Number,
        require: true
    },
    deptname: {
        type: String,
        require: true
    }
}, { collection: 'dept' });    // 自定义集合名，避免表名出现复数

exports.dept = mongoose.model('dept', deptSchema);