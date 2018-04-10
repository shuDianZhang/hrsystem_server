const moment = require('moment');

const clockInCollection = require('../model/work').clockIn;
const deptCollection = require('../model/dept').dept;
const jobCollection = require('../model/position').position;
const employeeInfoCollection = require('../model/employeeInfo').employeeInfo;
const userBaseInfoCollection = require('../model/userBaseInfo').userBaseInfo;

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
        clockRecord = await clockInCollection.findOne({ username, date: moment().format('YYYY-MM-DD') });
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

// 查找个人信息
let employeeInfo = async (ctx) => {
    let username = ctx.session.user;
    let employeeInfo = await employeeInfoCollection.findOne({ _id: username });
    let job_id = employeeInfo.job;
    let dept_id = employeeInfo.dept;
    let job = await jobCollection.findOne({ _id: job_id });
    let dept = await deptCollection.findOne({ _id: dept_id });
    let employeeInfo_c = { "name": "", "sex": "", "nation": "", "idnumber": "", "borndate": "", "marriage": "", "home": "", "phone": "", "email": "", "degree": "", "collage": "", "graduation": "", "dept": "", "job": "", "honor": [] };
    for (var item in employeeInfo_c) {
        employeeInfo_c[item] = employeeInfo[item];
    }
    employeeInfo_c.job = job.position;
    employeeInfo_c.dept = dept.deptname;
    ctx.body = {
        status: 0,
        msg: '个人信息查找成功!',
        content: employeeInfo_c
    }
}

// 查找管理页面顶部Menu信息
let topMenuInfo = async (ctx) => {
    let _id = ctx.session.user;
    let userBaseInfo = await userBaseInfoCollection.findOne({ _id });
    ctx.body = {
        status: 0,
        content: { _id: userBaseInfo._id, name: userBaseInfo.name, hasHeadImg: userBaseInfo.hasHeadImg }
    }
}

// 获取请假审批人信息
let getLeaderInfo = async (ctx) => {
    let user = ctx.session.user;
    let employeeInfo = await employeeInfoCollection.findOne({ _id: user });
    let dept = employeeInfo.dept;
    let leader = await employeeInfoCollection.findOne({ dept: dept, job: 2 });
    let leader_id = leader._id;
    let leaderBaseInfo = await userBaseInfoCollection.findOne({ _id: leader_id });
    ctx.body = {
        status: 0,
        content: leaderBaseInfo
    }
}

module.exports = { clockinRecord, ifClockIn, employeeInfo, topMenuInfo, getLeaderInfo }