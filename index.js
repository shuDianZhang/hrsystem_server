const Koa = require('koa');
const logger = require('koa-logger');
const mongoose = require('mongoose');
const session = require('koa-session');
const bodyParser = require('koa-bodyparser');
const cors = require('koa-cors');
const route = require('./router/router');

const app = new Koa();

// 若没有使用koa-bodyparser, ctx.request.body 为 undefine 
app.use(bodyParser());
app.use(logger());
// 如果要把Cookie发到服务器，一方面要服务器同意，指定Access-Control-Allow-Credentials字段。
app.use(cors({
    origin: 'http://localhost:3001',
    // 在该时间内，不用发出第二次预检请求
    maxAge: 5,
    credentials: true
}))

// 控制session
app.keys = ['shudianzhang'];
const CONFIG = {
    key: 'hrms',
    maxAge: 20 * 60 * 1000,
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: false
}
app.use(session(CONFIG, app));


// 连接Mongodb
mongoose.connect('mongodb://localhost:27017/hrms');
mongoose.connection.on('error', console.error);

app
    .use(route.routes())
    .use(route.allowedMethods());

app.listen(3111, () => {
    console.log('server listen at 3111');
});