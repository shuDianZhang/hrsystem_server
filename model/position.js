const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const positionSchema = new Schema({
    _id: {
        type: Number,
        require: true
    },
    position: {
        type: String,
        require: true
    }
}, { collection: 'position' });    // 自定义集合名，避免表名出现复数

exports.position = mongoose.model('position', positionSchema);