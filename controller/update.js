const salaryCollection = require('../model/salary').salary;

// 修改员工薪资
let employeePayment = async (ctx) => {
    let _id = ctx.request.body._id,
        baseSalary = ctx.request.body.baseSalary,
        bus = ctx.request.body.bus,
        hot = ctx.request.body.hot,
        telecom = ctx.request.body.telecom,
        dinner = ctx.request.body.dinner;
    let serviceSalary = {};
    serviceSalary['bus'] = bus;
    serviceSalary['hot'] = hot;
    serviceSalary['telecom'] = telecom;
    serviceSalary['dinner'] = dinner;
    if (_id) {
        salaryCollection.update({ _id }, { baseSalary, serviceSalary }, (err, data) => {
            if (!err) {
                ctx.body = {
                    status: 0,
                    msg: '薪酬设置成功!'
                }
            } else {
                ctx.body = {
                    status: 1,
                    msg: '薪酬设置失败'
                };
            }
        });
    } else {
        ctx.body = {
            status: 1,
            msg: '薪酬设置失败'
        };
    }
}

module.exports = { employeePayment }