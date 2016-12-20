const moment = require('moment-timezone');
const timezone = require('../constants/timezone');
const { getSchedulesByTargetDate } = require('../service/scrape');
const { ScheduleAttachment } = require('../models/schedule');

function commandSwitcher(payload) {
  switch (payload.command) {
    case '/imas':
      return imasCommand(payload);
  }
}

function imasCommand(payload) {
  var text = payload.text;
  var target; // [ YYYY, MM, DD ]
  if (/\d{4}-\d{2}-\d{2}/.test(text)) {
    target = text.split('-');
  } else {
    var tz = moment().tz(timezone.JAPAN);
    target = [
      tz.format('YYYY'),
      tz.format('MM'),
      tz.format('DD')
    ];
  }
  return getSchedulesByTargetDate(...target)
    .then(schedules => {
      var context = {};
      context.text = target.join('/') + 'の予定';
      if (schedules.length) context.attachments = schedules.map(schedule => new ScheduleAttachment(schedule));
      return context;
    }, err => {
      console.log(err); // eslint-disable-line
      return {
        text: 'Error: failed to get schedules'
      };
    });
}

module.exports = {
  commandSwitcher
};
