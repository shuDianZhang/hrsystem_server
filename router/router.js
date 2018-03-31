const Router = require('koa-router');
const userModule = require('../controller/user');
const workModule = require('../controller/work');
const searchModule = require('../controller/search');
const credentialsModule = require('../controller/credentials');

const route = new Router();

route.post('/user/login', userModule.login);
route.post('/user/logout', userModule.logout);
route.post('/user/checklogin', userModule.checklogin);
route.post('/user/changepassword', userModule.identifyLogin, userModule.changePassword);

route.post('/work/startwork', userModule.identifyLogin, workModule.clockIn);
route.post('/work/afterwork', userModule.identifyLogin, workModule.afterwork);

route.post('/search/ifclockin', searchModule.ifClockIn);
route.get('/search/clockinrecord', userModule.identifyLogin, searchModule.clockinRecord);

route.get('/upload/gettoken', credentialsModule.getToken);
module.exports = route;