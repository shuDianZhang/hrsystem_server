const moment = require('moment');
const resumeCollection = require('../model/resume').resume;
const userBaseInfoCollection = require('../model/userBaseInfo').userBaseInfo;
const workRecordCollection = require('../model/workRecord').workRecord;
const holidayInfoCollection = require('../model/holidayInfo').holidayInfo;

const qiniu = require('qiniu');

const accessKey = 'LBXMAi37VySKTS6OIu-7_IkSWrha6e9YqMn82ap-';
const secretKey = 'As0DnXjbRJPqSn9IPk7e_N3w2zqrs76ItRKQXBN5';
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

const salaryCollection = require('../model/salary').salary;

// 七牛云上传凭证
let getToken = async (ctx, option) => {
    let bucket = ctx.query.bucket,
        keyToOverwrite = ctx.query.keyToOverwrite;
    if (keyToOverwrite) {
        var putPolicy = new qiniu.rs.PutPolicy({ scope: bucket + ':' + keyToOverwrite, expires: 7200 });
    } else {
        var putPolicy = new qiniu.rs.PutPolicy({ scope: bucket, expires: 7200 });
    }
    let uploadToken = putPolicy.uploadToken(mac);
    if (uploadToken) {
        ctx.body = { status: 0, token: uploadToken }
    } else {
        ctx.body = { status: 1, token: 'error' }
    }
}

// 用户上传头像
let uploadHeadImage = async (ctx) => {
    let _id = ctx.session.user;
    let userResume = await userBaseInfoCollection.update({ _id }, { hasHeadImg: true }, (err, data) => {
        if (err) {
            ctx.body = { status: 1, msg: '数据库内部错误!联系开发人员解决!' }
            return;
        }
    });
    ctx.body = { status: 0, msg: '头像上传成功!' }
}


function handleResumeInfo(field, tag) {
    if (field) {
        let arr = field.split(tag);
        arr.map(function (item, index) {
            resume[field].push(item);
        });
    }
}

// 应聘者上传简历
let upresume = async (ctx) => {
    let resume = ctx.request.body;

    let goodResult = resume.goodResult;
    let workExperience = resume.workExperience;
    let projectExperience = resume.projectExperience;

    console.log(goodResult);
    resume.goodResult = [];
    resume.workExperience = [];
    resume.projectExperience = [];

    if (goodResult) {
        let arr = goodResult.split('#@@&@!(');
        arr.map(function (item, index) {
            resume.goodResult.push(item);
        });
        resume.goodResult.shift();
    }

    if (workExperience) {
        let arr = workExperience.split('#@@&@!(');
        arr.map(function (item, index) {
            resume.workExperience.push(JSON.parse(item));
        });
    }

    if (projectExperience) {
        let arr = projectExperience.split('#@@&@!(');
        arr.map(function (item, index) {
            resume.projectExperience.push(JSON.parse(item));
        });
    }

    let resumeInfo = new resumeCollection(resume);
    resumeInfo.save()
        .then((result) => {
            console.log(result.phone + '已投递简历，简历投递成功!');
        })
        .catch((err) => {
            console.log(err);
        });
    ctx.body = {
        status: 0,
        msg: '简历投递成功'
    }
}

// 更新员工基本工资
let setSalary = async (ctx) => {
    let name = ctx.request.body.name;
    let salaryInfo = await salaryCollection.update({ name: name });
}

// 重置账号密码
let resetAccount = async (ctx) => {
}

// 添加惩罚奖赏
let setWordRecord = async (ctx) => {
    let workRecord = ctx.request.body;
    let wordRecord2 = workRecord;
    wordRecord2['username'] = workRecord["_id"];
    wordRecord2['date'] = moment().format("YYYY-MM-DD");
    delete wordRecord2["_id"];
    let workRecordInfo = new workRecordCollection(wordRecord2);
    workRecordInfo.save()
        .then((result) => {
            console.log('已成功更新!');
        })
        .catch(err => {
            console.log(err);
        });
    ctx.body = {
        status: 0,
        msg: '成功添加奖惩记录'
    }
}

let getHoliday = async (ctx) => {
    let holiday = ctx.request.body;
    let phone = ctx.session.user;
    holiday['phone'] = phone;
    let newHolidayInfo = new holidayInfoCollection(holiday);
    newHolidayInfo.save().then((result) => {
        console.log('已成功更新!');
    }).catch((err) => {
        console.log(err);
    });
    ctx.body = {
        status: 0,
        msg: '请假成功，等待部门领导的审批!'
    }
}


module.exports = { getToken, uploadHeadImage, upresume, setSalary, resetAccount, setWordRecord, getHoliday }