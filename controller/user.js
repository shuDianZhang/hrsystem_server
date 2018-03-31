const userCollection = require('../model/user').user;

// ctx.request ?? ctx.req  ctx.response ?? ctx.res ??? ctx.body ???弄清楚

// 用户登录鉴权
let identifyLogin = async (ctx, next) => {
    let user = ctx.session.user;
    if (user) {
        await next();
    } else {
        ctx.body = { status: 1, msg: '用户未登陆!' }
    }
}

// 用户登录
let login = async (ctx) => {
    let username = ctx.request.body.username,
        password = ctx.request.body.password,
        accountType = ctx.request.body.type;
    let user = await userCollection.findOne({
        username,
        type: accountType
    });
    if (user) {
        if (user.password != password) {
            ctx.body = { status: 1, msg: '用户名或密码有误!' };
            return;
        }
        ctx.session.user = username;  // 往客户端种cookie session_id
        ctx.body = { status: 0, msg: '登陆成功!' };
    } else {
        ctx.body = { status: 2, msg: '该用户不存在!' };
    }
}

// 用户退出
let logout = async (ctx) => {
    ctx.session = null;
    ctx.body = { status: 0, msg: '退出成功' }
}

// 检查用户登陆状态
let checklogin = async (ctx) => {
    let username = ctx.session.user;
    let user = await userCollection.findOne({ username });
    if (user) {
        ctx.body = { status: 0, type: user.type };
        return;
    }
    ctx.body = { status: 1, msg: '服务器故障' };
}

// 修改密码
let changePassword = async (ctx) => {
    let password = ctx.request.body.password,
        password_c = ctx.request.body.password_c,
        username = ctx.session.user;
    if (username) {
        let user = await userCollection.findOne({ username });
        if (user.password === password) {
            userCollection.update({ username }, { password: password_c }, (err, data) => {
                if (err) {
                    console.log(err);
                    return;
                }
            });
            ctx.body = { status: 0, msg: '修改密码成功!' };
            return;
        }
        ctx.body = { status: 1, msg: '初始密码错误!' }
    }
}

module.exports = { login, logout, checklogin, identifyLogin, changePassword }