const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const holidayInfoSchema = new Schema({
    phone: {
        type: String,
        require: true
    },
    approvePeople: {
        type: String,
        require: true
    },
    holidayLong: {
        type: Number,
        require: true
    },
    holidayReason: {
        type: String,
        require: true
    },
    holidayStartTime: {
        type: String,
        require: true
    },
    holidayType: {
        type: String,
        require: true
    },
    imageUrl: {
        type: Array,
        require: true
    },
    ifApprove: {
        type: Boolean,
        require: true
    }
}, { collection: 'holidayinfo' });    // 自定义集合名，避免表名出现复数

exports.holidayInfo = mongoose.model('holidayinfo', holidayInfoSchema);