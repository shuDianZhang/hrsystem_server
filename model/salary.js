const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const salarySchema = new Schema({
    _id: {
        type: String,
        require: true
    },
    name: {
        type: String,
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
    rewardSalary: {
        type: Number,
        require: true
    },
    overtimeSalary: {
        type: Number,
        require: true
    },
    punishMoney: {
        type: Number,
        require: true
    }
}, { collection: 'salary' });    // 自定义集合名，避免表名出现复数

exports.salary = mongoose.model('salary', salarySchema);