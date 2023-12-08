var mysql = require("mysql");
var TelegramBot = require("node-telegram-bot-api");
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  pool: mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT, //mysql端口
    user: process.env.DB_USER, //mysql用户名
    password: process.env.DB_PWD, //mysql密码
    database: process.env.DB_DATABASE, //mysql数据库
    multipleStatements: true, //不要改这个
  }),
  // botObj:bot,
  h5_url: process.env.H5_URL, //H5链接
  pc28_url: process.env.PC28_URL||'', //PC28接口
  jwt_key: process.env.JWT_KEY, //JWT_KEY
  token: process.env.BOT_TOKEN, //机器人的token
  chatid: process.env.CHATID, //开奖群的id
  sxfqunid: process.env.SXFQUNID, //上下分群的id
  houtaiqunid: process.env.HOUTAIQUNID,
  
  inline_keyboard: [
    //内联键盘
    [
      { text: "当前余额", callback_data: "6" },
      { text: "当期投注", callback_data: "8" },
    ],
    [
      { text: "最近投注", callback_data: "7" },
      { text: "账单记录", callback_data: "9" },
    ],
  ],
  game_inline_keyboard: [
    //内联键盘
    [{ text: "pc28开始下注", callback_game: "" }],
    [
      { text: "当前余额", callback_data: "6" },
      { text: "当期投注", callback_data: "8" },
    ],
    [
      { text: "最近投注", callback_data: "7" },
      { text: "账单记录", callback_data: "9" },
    ],
  ],
  keyboard: [
    //内联键盘
    [{ text: "🏧佣金提现" }, { text: "🏠代理中心" }],
    [{ text: "游戏规则" }, { text: "开始游戏" }, { text: "我要充值" }],
    [{ text: "最近投注" }, { text: "账单记录" }, { text: "个人中心" }],
  ],
  xiazhu_inline_keyboard: [
    [
      { text: "xx集团财务", url: "https://t.me/123" },
      { text: "xx集团财务", url: "https://t.me/123" },
    ],
  ],
  guize_inline_keyboard: [
    [
      { text: "游戏规则", url: "https://t.me/123" },
      { text: "福利彩金", url: "https://t.me/123" },
    ],
    [
      { text: "代理中心", url: "https://t.me/123" },
      { text: "上下分群", url: "https://t.me/123" },
    ],
  ],
  tixian_inline_keyboard: [
    [
      { text: "xx集团财务", url: "https://t.me/123" },
      { text: "xx集团财务", url: "https://t.me/123" },
    ],
  ],
  start_line_keyboard: [
    [{ text: "👉👉开始游戏👈👈", url: "https://t.me/123" }],
  ],
  yongjintixian_line_keyboard: [
    //[{text:"USDT提现",callback_data:"qbtx"}],
    [{ text: "立即提现", url: "https://t.me/123" }],
  ],
  yjc_inline_keyboard: [[{ text: "我要代理", url: "https://t.me/123" }]],
  betMin: 10, //单笔最小下注
  betMax: 80000.0, //单笔最大下注
  returnWater: 0.01, //反水比例，默认1.5%
  yongjin: 0.01, //fuyingli
  coin: "元", //货币单位
  peilv: {
    //赔率设置
    dxds: 2, //大小单双
    fushi1: 4.2, //大单小双
    fushi2: 4.6, //小单大双
    baozi: 66, //豹子
    duizi: 3.5, //对子
    shunzi: 15, //顺子
    s0d: 608, //押0点
    s1d: 228, //押1点
    s2d: 108, //押2点
    s3d: 68, //押3点
    s4d: 50, //押4点
    s5d: 39, //押5点
    s6d: 28, //押6点
    s7d: 22, //押7点
    s8d: 18, //押8点
    s9d: 15, //押9点
    s10d: 13, //押10点
    s11d: 13, //押11点
    s12d: 12, //押12点
    s13d: 12, //押13点
    s14d: 12, //押14点
    s15d: 12, //押15点
    s16d: 13, //押16点
    s17d: 13, //押17点
    s18d: 15, //押18点
    s19d: 18, //押19点
    s20d: 22, //押20点
    s21d: 28, //押21点
    s22d: 39, //押22点
    s23d: 50, //押23点
    s24d: 68, //押24点
    s25d: 108, //押25点
    s26d: 228, //押26点
    s27d: 608, //押27点
    jdjx: 15, //极大极小
    t3dxds: 1.98, //1-3
    t3shuzi: 9.9, //1-3
    baosan: 4.1, //包三
  },
  //限额
  xianzhu: {
    dianshabaozi: 100,
    dxds: 80000, //大小单双
    zuhe: 30000, //
    shunzi: 10000, //顺子
    duizi: 10000, //对子
    shuzi: 5000, //数字
    baozi: 5000, //豹子
    jizhi: 10000, //极值
    t3dxds: 5000, //1-3球 大小单双
    t3shuzi: 5000, //1-3球 数字
    baosan: 5000, //包三
  },
  sendmode: "pt", //发送提醒消息的模式 pt:图片+文字 t:文字
  isfptx: true, //是否开启即将封盘提醒 false:关闭 true:开启
  istishishu: true, //是否在开奖结果展示输的用户投注 false:不展示 true:展示
  ishistorypicture: true, //是否开奖历史以图片的形式发送 false:否 true:是
  issendsxf: true, //是否发送上下分成功的提示 false:否 true:是
  czaddress: "123", //人工上分的充值地址
  trxPrivateKey: "123",
  port: process.env.HTTP_PORT, //运行端口
  czMin: 30.0, //单笔最小充值
  txMin: 50.0, //单笔最小提现
  txfee: 0,
  adminid: [1838650949], //下分管理员id
  youxigrouplink: "https://t.me/123",
  isnoticegroup: true,
  botusername: "https://t.me/Codypc28Bot",
  utormb: 7,
};