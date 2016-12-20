const axios = require('axios');
const { ScheduleAttachment } = require('../models/schedule');
const webhookURL = process.env.WEBHOOK_URL;

function postSchedules(schedules = []) {
  var data = {};
  if (schedules.length) {
    data.text = '今日のアイマスの予定！';
    data.attachments = schedules.map(schedule => new ScheduleAttachment(schedule));
  } else {
    data.text = '今日アイマスの予定はありません！';
  }
  return axios.post(webhookURL, data);
}

module.exports = {
  postSchedules
};
