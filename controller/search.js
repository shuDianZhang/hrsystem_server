const moment = require('moment');

const clockInCollection = require('../model/work').clockIn;

// 查找职工考勤记录
let clockinRecord = async (ctx) => {
    let starttime = ctx.query.starttime,
        endtime = ctx.query.endtime,
        username = ctx.session.user;
    let clockRecord = await clockInCollection.find(
        {
            username,
            date: { $gte: new Date(starttime), $lte: new Date(endtime) }
        }
    );
    ctx.body = {
        status: 0,
        content: clockRecord,
        msg: '查询成功'
    }
}

let ifClockIn = async (ctx) => {
    let username = ctx.session.user,
        clockRecord = await clockInCollection.findOne({ username, date: moment().format('YYYY-MM-D') });
    if (clockRecord) {
        if (clockRecord.starttime && clockRecord.endtime) {
            ctx.body = { input_1: true, input_2: true };
        } else if (!clockRecord.starttime && clockRecord.endtime) {
            ctx.body = { input_1: false, input_2: true };
        } else {
            ctx.body = { input_1: true, input_2: false };
        }
    } else {
        ctx.body = { input_1: false, input_2: false };
    }
}

module.exports = { clockinRecord, ifClockIn }