const qiniu = require('qiniu');

const accessKey = 'LBXMAi37VySKTS6OIu-7_IkSWrha6e9YqMn82ap-';
const secretKey = 'As0DnXjbRJPqSn9IPk7e_N3w2zqrs76ItRKQXBN5';
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
let options = { scope: 'shudianzhang', expires: 7200 };


let getToken = async (ctx) => {
    let putPolicy = new qiniu.rs.PutPolicy(options);
    let uploadToken = putPolicy.uploadToken(mac);
    console.log(uploadToken);
}

module.exports = { getToken }