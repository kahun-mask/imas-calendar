const cheerio = require('cheerio-httpcli');
const moment = require('moment-timezone');
const cache = require('memory-cache');
const timezone = require('../constants/timezone');
const { Schedule } = require('../models/schedule');
const now = moment().tz(timezone.JAPAN);

function scrape(url, conf) {
  return cheerio.fetch(url, conf).then(result => {
    if (cheerio.error) {
      throw cheerio.error;
    } else {
      return result;
    }
  });
}

function analyze([ result, meta ]) {
  var { $ } = result;
  var { ey, em } = meta;
  var $list = $('.List tr');
  var list = [];
  $list.each(function() {
    var art = $('.article2', this);
    if (art.text()) list.push(this);
  });

  var schedules = [];
  list.forEach((item, index) => {
    var day, daySrc = $('.day2 img', item).attr('src');
    // day
    if (daySrc) {
      day = daySrc;
    } else {
      day = schedules[index - 1].day;
    }

    var time, timeElm = $('.time2', item);
    time = timeElm.text();

    var perf, perfElm = $('.performance2 img', item);
    perf = perfElm.attr('src');

    var genre = $('.genre2', item).text();

    var article = $('.article2', item);
    var text = article.text();
    var link = $('a', article).attr('href');

    schedules.push({ day, time, perf, genre, text, link, ey, em });
  });
  return schedules.map(schedule => new Schedule(schedule));
}

const cacheMs = 1000 * 60 * 60 * 24;
function getSchedules(query = { ey: now.format('YYYY'), em: now.format('MM') }) {
  var cacheKey = query.ey + query.em;
  var cacheData = cache.get(cacheKey);
  if (cacheData) {
    return Promise.resolve(cacheData);
  } else {
    return scrape('http://idolmaster.jp/schedule/', query)
      .then(result => [ result, query ])
      .then(analyze)
      .then(function(schedules) {
        try {
          cache.put(cacheKey, schedules, cacheMs);
        } catch (err) {
          console.log(err); // eslint-disable-line
        }
        return schedules;
      });
  }
}

function getSchedulesByDate(date = Date.now()) {
  var formatSTR = 'YYYYMMDD';
  var currentDate = moment(date).tz(timezone.JAPAN).format(formatSTR);
  return getSchedules()
    .then(schedules => {
      return schedules.filter(schedule => moment(schedule.datetime).tz(timezone.JAPAN).format(formatSTR) === currentDate);
    });
}

function getSchedulesByTargetDate(YYYY, MM, DD) {
  var currentDate = YYYY + MM + DD;
  var formatSTR = 'YYYYMMDD';
  return getSchedules({ ey: YYYY, em: MM })
    .then(schedules => {
      return schedules.filter(schedule => moment(schedule.datetime).tz(timezone.JAPAN).format(formatSTR) === currentDate);
    });
}

module.exports = {
  scrape,
  analyze,
  getSchedules,
  getSchedulesByDate,
  getSchedulesByTargetDate
};
