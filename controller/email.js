var email = require('emailjs');

var server = email.server.connect({
  user: '506975676@qq.com',
  password: 'lcsnbjfzumipcafb',
  host: 'smtp.qq.com',
  ssl: true
});

let sendEmail = async (ctx, option) => {
  server.send({
    text: '您好!非常感谢您参加本次面次面试，很遗憾的告诉你，你没有通过简历筛选，无法获得面试机会，被打入人才库!',
    from: '506975676@qq.com',
    to: '2303093270@qq.com',
    subject: '中国电信21CN面试结果'
  }, function (err, message) {
    console.log(err || message);
  });
}


module.exports = { sendEmail }