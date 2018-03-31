const moment = require('moment');

const clockInCollection = require('../model/work').clockIn;
const userCollection = require('../model/user').user;

// 上班打卡
let clockIn = async (ctx) => {
    let username = ctx.session.user;
    if (username) {
        let insertClockIn = new clockInCollection({
            username: username,
            starttime: moment().format('HH:mm:ss'),
            date: moment().format('YYYY-MM-D')
        });
        insertClockIn.save().catch((err) => { console.log(err); });
        ctx.body = { status: 0, msg: '打卡成功' };
    }
}

// 下班打卡
let afterwork = async (ctx) => {
    let username = ctx.session.user;
    clockInCollection.update({
        username: username,
        date: moment().format('YYYY-MM-D')
    }, { endtime: moment().format('HH:mm:ss') }, (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
    });
    ctx.body = { status: 0, msg: '打卡成功' };
}

module.exports = { clockIn, afterwork }