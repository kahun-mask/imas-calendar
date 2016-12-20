const moment = require('moment-timezone');
const { Performances, PerformanceMap } = require('../constants/performance');

/**
 * @type Schedule
 * @prop {number} datetime datetime
 * @prop {string[]} perf performance kind
 * @prop {string} genre genre text
 * @prop {string} text title text
 * @prop {string} link linkUrl to details
 */
function Schedule({ day, time, perf, genre, text, link, ey, em }) {
  var _day = ('0' + parseInt(day.match(/img_days_(\d+).jpg$/).pop(), 10)).slice(-2);
  var _time = (/^(\d+):(\d+)(〜|～|~)?$/.test(time)) ? time.substring(0, 5) : '00:00';
  this.datetime = +moment(`${ey}-${em}-${_day}T${_time}+09:00`).toDate();

  var _perf = parseInt(perf.match(/ico_(\d+).png$/).pop(), 10) - 1;
  this.perf = Performances[_perf] || [PerformanceMap.none];
  this.genre = genre;
  this.text = text;
  this.link = link;
}

function ScheduleAttachment(schedule) {
  this.title = schedule.text;
  this.title_link = schedule.link;
  this.color = 'good';
  this.text = [
    `kinds: ${schedule.perf.join(', ')}`,
    `genre: ${schedule.genre}`,
    `start: ${moment(schedule.datetime).tz('Asia/Tokyo').format('HH:mm')}`
  ].join('\n');
}

module.exports = {
  Schedule,
  ScheduleAttachment
};
