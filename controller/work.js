const moment = require('moment');

const clockInCollection = require('../model/work').clockIn;
const userCollection = require('../model/user').user;

// 上班打卡
let clockIn = async (ctx) => {
    let username = ctx.session.user;

    let clockInfo = { state: "正常", zhengchang: 0, chidao: 0, kuanggong: 0, zaotui: 0 };

    let state = "正常";
    // 打卡时间   moment 返回 和 new Date(); 返回 是一样的格式
    let clockInTime = moment();
    // 上班时间   moment("08:30:00", "HH:mm:ss"); 返回的是时间戳
    let starttime = moment(moment("08:30:00", "HH:mm:ss").format("YYYY-MM-DD HH:mm:ss"));
    // 上班时间 + 界限1
    let sepTime1 = moment(starttime).add(60, 'minutes');
    // 下午打卡
    let afternoonTime = moment(moment("13:30:00", "HH:mm:ss").format("YYYY-MM-DD HH:mm:ss"));

    if (starttime.isBefore(clockInTime) && clockInTime.isBefore(sepTime1)) {
        clockInfo.state = "迟到";
        clockInfo.chidao += 1;
    }
    if (sepTime1.isBefore(clockInTime) && clockInTime.isBefore(afternoonTime)) {
        clockInfo.state = "旷工";
        clockInfo.kuanggong += 0.5;
    }
    if (afternoonTime.isBefore(clockInTime)) {
        clockInfo.state = "旷工";
        clockInfo.kuanggong += 1;
    }

    if (username) {
        let insertClockIn = new clockInCollection({
            username: username,
            starttime: moment().format('HH:mm:ss'),
            date: moment().format('YYYY-MM-DD'),
            state: clockInfo.state,
            zhengchang: clockInfo.zhengchang,
            chidao: clockInfo.chidao,
            kuanggong: clockInfo.kuanggong,
            zaotui: clockInfo.zaotui
        });
        insertClockIn.save().catch((err) => { console.log(err); });
        ctx.body = { status: 0, msg: '打卡成功' };
    }
}

// 下班打卡
let afterwork = async (ctx) => {
    let username = ctx.session.user,
        clockRecord = await clockInCollection.findOne({ username, date: moment().format('YYYY-MM-DD') });

    let clockInfo = { state: clockRecord.state, zhengchang: clockRecord.zhengchang, kuanggong: clockRecord.kuanggong, zaotui: clockRecord.zaotui };

    // 打卡时间
    let clockInTime = moment();
    // 下班时间
    let afterWorkTime = moment(moment("17:30:00", "HH:mm:ss").format("YYYY-MM-DD HH:mm:ss"));
    // 下班时间 - 界限1
    let sepTime1 = moment(afterWorkTime).subtract(30, 'minutes');

    if (clockInfo.state === "旷工") {
        if (clockInTime.isBefore(afterWorkTime) && sepTime1.isBefore(clockInTime)) {
            clockInfo.zaotui += 1;
        }
        if (clockInTime.isBefore(sepTime1)) {
            clockInfo.kuanggong += 1;
        }
    }

    if (clockInfo.state != "旷工") {
        if (clockInTime.isBefore(afterWorkTime) && sepTime1.isBefore(clockInTime)) {
            clockInfo.state = "早退";
            clockInfo.zaotui += 1;
        }
        if (clockInTime.isBefore(sepTime1)) {
            clockInfo.state = "旷工";
            clockInfo.kuanggong += 1;
        }
    }

    if (clockInfo.chidao === 0 && clockInfo.zaotui === 0 && clockInfo.kuanggong === 0) {
        clockInfo.state = "正常";
        clockInfo.zhengchang += 1;
    }

    clockInCollection.update({
        username: username,
        date: moment().format('YYYY-MM-DD')
    }, { endtime: moment().format('HH:mm:ss'), state: clockInfo.state, zhengchang: clockInfo.zhengchang, zaotui: clockInfo.zaotui, kuanggong: clockInfo.kuanggong }, (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
    });
    ctx.body = { status: 0, msg: '打卡成功' };
}

module.exports = { clockIn, afterwork }