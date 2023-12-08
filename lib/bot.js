var TelegramBot = require('node-telegram-bot-api');
var conf = require('../config/conf');

const dotenv = require("dotenv")
dotenv.config()

//单例
class TelegramBotLib {
    static getInstance() {
      if (!TelegramBotLib.instance) {
        TelegramBotLib.instance = new TelegramBot(conf.token, {polling: true,baseApiUrl: process.env.BOT_API});
      }
      return TelegramBotLib.instance;
    }
  }
  

  
module.exports = TelegramBotLib;