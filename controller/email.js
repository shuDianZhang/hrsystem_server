const resumeCollection = require('../model/resume').resume;
const interviewCollecton = require('../model/interview').interview;
const moment = require('moment');

var email = require('emailjs');

var server = email.server.connect({
  user: '506975676@qq.com',
  password: 'lcsnbjfzumipcafb',
  host: 'smtp.qq.com',
  ssl: true
});

let sendEmail = async (ctx) => {
  let interviewInfo = ctx.request.body.interviewInfo;
  let resumeInfo = await resumeCollection.findOne({ name: interviewInfo.name });
  let intervieweeEmail = resumeInfo.email;             // 面试者邮箱
  let interviewerEmail = interviewInfo.interviewer;    // 面试官邮箱
  let place = interviewInfo.place;
  let time = moment(interviewInfo.time).format('YYYY年MM月DD日 HH:mm:ss');

  let interviewRecord = new interviewCollecton({
    name: interviewInfo.name,
    email: intervieweeEmail,
    pass: true,
    reinterview: true
  });

  interviewRecord.save()
    .then((result) => {
      console.log('已成功更新!');
    })
    .catch(err => {
      console.log(err);
    });

  server.send({
    subject: '面试邀请通知',
    text: `恭喜您通过了我司的简历筛选，现邀请您来我司面试。------ 面试地点：${place} ---------面试时间：${time}`,
    from: '506975676@qq.com',
    to: intervieweeEmail
  });

  server.send({
    subject: '面试邀请通知',
    text: `我司于${place} ${time}安排了一场面试，请您作为面试官出席。面试结束之后，前往  http://localhost:3001/#/evaluate?id=${intervieweeEmail}  为应聘者打分。`,
    from: '506975676@qq.com',
    to: interviewerEmail
  });

  ctx.body = {
    status: 0,
    msg: '面试邀请邮件发送成功!'
  }
}

let sendEmailFail = async (ctx) => {
  let name = ctx.request.body.name;
  let resumeInfo = await resumeCollection.findOne({ name });
  let emailTo = resumeInfo.email;
  server.send({
    subject: '面试结果通知',
    text: '很遗憾，您的面试没有通过，但您出色的表现已经被纳入公司的人才库。',
    from: '506975676@qq.com',
    to: emailTo
  });
  ctx.body = {
    status: 0,
    msg: '面试邀请邮件发送成功!'
  }
}

let evaluate = async (ctx) => {
  let pass = ctx.request.body.pass;  // 1 通过 2 不通过
  let reinterview = ctx.request.body.reinterview;  // 1 进入复试   2 不进入复试
  let email = ctx.request.body.email;
  if (pass === 2) {
    server.send({
      subject: '面试结果通知',
      text: '很遗憾，您的面试没有通过，但您出色的表现已经被纳入公司的人才库。',
      from: '506975676@qq.com',
      to: emailTo
    });
    ctx.body = {
      status: 0,
      msg: '提交成功!'
    }
    return;
  }
  if (pass === 1 && reinterview === 2) {
    console.log('发offer ~');
    server.send({
      subject: '录用通知',
      text: '恭喜您通过了我司所有的招聘流程，现在向你发放Offer。',
      from: '506975676@qq.com',
      to: email
    });
    ctx.body = {
      status: 0,
      msg: '提交成功!'
    }
    return;
  }
  if (pass === 1 && reinterview === 1) {
    server.send({
      subject: '面试结果通知',
      text: '恭喜您通过本轮面试，稍等通知，安排下一场的面试',
      from: '506975676@qq.com',
      to: email
    });
    ctx.body = {
      status: 0,
      msg: '提交成功!'
    }
  }
}

module.exports = { sendEmail, sendEmailFail, evaluate }