const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const salaryAllSchema = new Schema({
    _id: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        require: true
    },
    baseSalary: {
        type: Number,
        require: true
    },
    serviceSalary: {
        type: Number,
        require: true
    },
    overtimeSalary: {
        type: Number,
        require: true
    },
    rewardSalary: {
        type: Number,
        require: true
    },
    punishMoney: {
        type: Number,
        require: true
    },
    shouldPay: {
        type: Number,
        require: true
    }
}, { collection: 'salaryall' });    // 自定义集合名，避免表名出现复数

exports.salaryAll = mongoose.model('salaryall', salaryAllSchema);