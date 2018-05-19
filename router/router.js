const Router = require('koa-router');
const userModule = require('../controller/user');
const workModule = require('../controller/work');
const searchModule = require('../controller/search');
const credentialsModule = require('../controller/credentials');
const emailModule = require('../controller/email');

const route = new Router();

route.post('/user/login', userModule.login);
route.post('/user/logout', userModule.logout);
route.post('/user/checklogin', userModule.checklogin);
route.post('/user/changepassword', userModule.identifyLogin, userModule.changePassword);

route.post('/work/startwork', userModule.identifyLogin, workModule.clockIn);
route.post('/work/afterwork', userModule.identifyLogin, workModule.afterwork);

route.post('/search/ifclockin', searchModule.ifClockIn);
route.get('/search/clockinrecord', userModule.identifyLogin, searchModule.clockinRecord);
route.get('/search/getTopMenuInfo', userModule.identifyLogin, searchModule.topMenuInfo);
route.get('/search/employeeInfo', userModule.identifyLogin, searchModule.employeeInfo);
route.get('/search/leader', userModule.identifyLogin, searchModule.getLeaderInfo);
route.get('/search/getResume', userModule.identifyLogin, searchModule.getResume);
route.get('/search/detailResume', userModule.identifyLogin, searchModule.getDetailResume);
route.get('/search/getEmployeePayment', userModule.identifyLogin, searchModule.getEmployeePayment);
route.get('/search/accountList', userModule.identifyLogin, searchModule.getAccountList);
route.get('/search/employeeInfoList', userModule.identifyLogin, searchModule.getEmployeeInfoList);
route.get('/search/name', userModule.identifyLogin, searchModule.getName);
route.get('/search/getWorkRecord', userModule.identifyLogin, searchModule.getWorkRecord);

route.get('/upload/gettoken', credentialsModule.getToken);
route.post('/upload/upresume', credentialsModule.upresume);
route.post('/upload/setSalary', userModule.identifyLogin, credentialsModule.setSalary);
route.post('/upload/resetAccount', userModule.identifyLogin, credentialsModule.resetAccount);
route.post('/upload/wordRecord', userModule.identifyLogin, credentialsModule.setWordRecord);

route.post('/upload/headimage', credentialsModule.uploadHeadImage);
route.post('/send/email', emailModule.sendEmail);


module.exports = route;