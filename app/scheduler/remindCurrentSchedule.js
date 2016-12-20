if (!process.env.WEBHOOK_URL) {
  throw new Error('No WEBHOOK_URL defined.');
}

const { getSchedulesByDate } = require('../service/scrape');
const { postSchedules } = require('../service/slack');

getSchedulesByDate()
  .then(postSchedules)
  .catch(console.log);
