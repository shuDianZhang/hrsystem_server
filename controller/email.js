const resumeCollection = require('../model/resume').resume;

var email = require('emailjs');

var server = email.server.connect({
  user: '506975676@qq.com',
  password: 'lcsnbjfzumipcafb',
  host: 'smtp.qq.com',
  ssl: true
});

let sendEmail = async (ctx) => {
  let name = ctx.request.body.name;
  let resumeInfo = await resumeCollection.findOne({ name });
  let emailTo = resumeInfo.email;
  server.send({
    text: '邀请你面试!',
    from: '506975676@qq.com',
    to: emailTo,
    subject: 'test测试邮件'
  });
  ctx.body = {
    status: 0,
    msg: '面试邀请邮件发送成功!'
  }
}


module.exports = { sendEmail }