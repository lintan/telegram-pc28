const mysql = require('mysql');

var common = {
    reqError(res) { //return错误状态
        return res.send({
            stateCode:400,
            message:"系统错误,请重试"
        })
    },
    oc(req) { //api验证函数
       
        return true
    },
    od(req) { //api验证函数
        return true //req.headers.oc/666+500>Date.now();
    }
};

module.exports = common;