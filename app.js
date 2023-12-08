
const botLib = require("./lib/bot");

var bot = botLib.getInstance();

var isstate,
  iskey,
  iszaliu,
  a,
  b,
  c,
  ssss,
  daxiao,
  danshuang,
  baozi,
  shunzi,
  duizi,
  jdjx,
  value,
  date,
  minutes,
  isfengpantixing = false,
  isfengpan = false,
  iskaijiang = false,
  isweihu = false,
  resultArray = [],
  resultid = "",
  resultCount = [
    { value: 0 },
    { value: 0 },
    { value: 0 },
    { value: 0 },
    { value: 0 },
    { value: 0 },
  ],
  resultdxds = {
    big: 0,
    small: 0,
    odd: 0,
    even: 0,
    baozi: 0,
    shunzi: 0,
    duizi: 0,
  };
  
  
console.log("初始化完成");
var allkeyword = [
  "zs",
  "游戏",
  "/start",
  "我要充值",
  "🏧佣金提现",
  "游戏规则",
  "开始游戏",
  "🏠代理中心",
  "最近投注",
  "账单记录",
  "个人中心",
  "实时佣金排名",
  "取消",
  "撤回",
  "qx",
  "历史",
  "上分",
  "下分",
  "大",
  "小",
  "单",
  "双",
  "豹子",
  "对子",
  "顺子",
  "杀",
  "T",
  "押",
  "和",
  "极大",
  "极小",
  "哈",
  "1",
  "2",
  "3",
  "反水",
  "余额",
];
/*监听新的文字消息*/
var txt = "PC28演示群组：(https://t.me/pc28chat) ; PC28网页版演示群组:(https://t.me/pc28html)";
bot.on("text", (msg) => {
  if (
    msg.text == "大" ||
    msg.text == "小" ||
    msg.text == "单" ||
    msg.text == "双" ||
    msg.text == "豹子" ||
    msg.text == "对子" ||
    msg.text == "顺子" ||
    msg.text == "押"
  ) {
    //return;
  }
  
  bot.sendMessage(msg.chat.id,txt)
});

console.log(txt);

/*主函数，处理过滤完的文字消息 */
function main(msg) {
  var nickname = utils.guolvname(
    (msg.from.first_name ? msg.from.first_name : "") +
      (msg.from.last_name ? msg.from.last_name : "")
  );
  if (!isfengpan) {
    if (msg.text == "取消" || msg.text == "撤回" || msg.text == "qx") {
      quanbuchehui(msg.text, msg.from.id, msg.from.username, msg.message_id);
    } else if (msg.text == "2" || msg.text == "历史" || msg.text == "zs") {
      lishi(msg.text, msg.from.id, msg.from.username, msg.message_id);
    } else if (msg.text.search("历史") != -1) {
      lishichaxun(msg.text, msg.from.id, msg.from.username, msg.message_id);
    } else if (msg.text == "1" || msg.text == "余额") {
      benqitouzhutxt(
        msg.text,
        msg.from.id,
        msg.from.username,
        msg.message_id,
        msg.chat.id,
        nickname
      );
    } else if (msg.text == "反水") {
      getReturnWatertxt(
        msg.text,
        msg.from.id,
        msg.from.username,
        msg.message_id,
        msg.chat.id
      );
    } else {
      jndbet(
        msg.text,
        msg.from.id,
        msg.from.username,
        msg.message_id,
        nickname
      );
    }
  }
}


function guizehuodong(msg) {
  bot.sendMessage(
    msg.chat.id,
    `大小单双2.8倍
小单大双组合6倍
小双大单组合6倍
遇13/14 、对子、顺子、豹子，中奖回本金
豹子66 顺子12 对子3 极小0～5级大22～27  12倍
注：890 ,019等三个数字连在一起均为顺子

反水统一为 100以上反1%

以机器人录入结算为准！
💵  0/27=500倍💵1/26=120倍 💵
💵   2/25=98倍 💵 3/24=58倍💵
💵   4/23=48倍 💵5/22=32倍 💵
💵   6/21=25倍 💵7/20=20倍 💵
💵   8/19=17倍 💵9/18=15倍 💵
💵 10/17=14倍 💵11/16=13倍💵
💵💵12/15=12倍 💵💵💵
💵💵13/14/=10倍 💵💵💵

总注最高限额：50000封顶
单注：1000封顶
组合：500封顶
极大/极小：200封顶
数字0/27：100封顶
数字01/26：100封顶
数字02/25：100封顶
其他数字：300封顶
对子：1000封顶
顺子：500封顶
豹子：200封顶`,
    {
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }
  );
}


function tongji(telegramid, name, callbackQueryid) {
  conf.pool.getConnection(function (err, connection) {
    if (err) return err;
    connection.query(
      `SELECT * FROM users where telegramid = "${telegramid}";SELECT sum(amount),sum(result),sum(amountreturn) FROM jndbet where telegramid = "${telegramid}" and time like "${moment(
        Math.round(date) - 1000 * 60 * 60 * 24
      ).format("YYYY-MM-DD")}%";`,
      (error, result) => {
        connection.destroy();
        if (error) return error;
        if (!result[0][0]) {
          return;
        }
        bot
          .answerCallbackQuery(callbackQueryid, {
            text: `昨日数据详情\n投注:${
              result[1][0]["sum(amount)"] ? result[1][0]["sum(amount)"] : 0
            }  盈利:${parseInt(
              result[1][0]["sum(result)"] -
                result[1][0]["sum(amount)"] +
                result[1][0]["sum(amountreturn)"] +
                result[1][0]["sum(amount)"] * 0.01
            )}\n反水:${parseInt(
              result[1][0]["sum(amountreturn)"] +
                result[1][0]["sum(amount)"] * 0.01
            )}  回水:${parseInt(result[0][0]["jndhuishui"])}`,
            show_alert: true,
            cache_time: 1,
          })
          .catch((e) => {
            console.log("领取反水出错");
          });
      }
    );
  });
}