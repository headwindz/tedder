const padStart = require('lodash/padStart'),
  chalk = require('chalk'),
  cowsay = require('cowsay'),
  lolcatjs = require('lolcatjs'),
  DAYS_PER_WEEK = 7;

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const DAY_MAP = DAYS.reduce((map, current, index) => {
  return {
    ...map,
    [current]: (index + 1) % DAYS_PER_WEEK,
  };
}, {});

function format(template, date) {
  let y = date.getFullYear(),
    m = date.getMonth() + 1,
    d = date.getDate();

  return template.replace(/\[(yy|yyyy|mm|dd)\]/gi, (match, group) => {
    switch (group.toLowerCase()) {
      case 'yyyy':
        return y;
      case 'yy':
        return y % 100;
      case 'mm':
        return pad2(m);
      case 'dd':
        return pad2(d);
    }
  });
}

function getDate(day = 'Mon', next = 1, currentDate) {
  let baseDay = DAY_MAP.hasOwnProperty(day) ? DAY_MAP[day] : 1; // default to Monday

  let firstDiff =
    (baseDay + (DAYS_PER_WEEK - currentDate.getDay())) % DAYS_PER_WEEK;
  firstDiff = firstDiff === 0 ? DAYS_PER_WEEK : firstDiff; // same day
  let rest = next >= 1 ? (next - 1) * DAYS_PER_WEEK : 0;
  currentDate.setDate(currentDate.getDate() + firstDiff + rest);
  return currentDate;
}

function pad2(str) {
  return padStart(str, 2, '0');
}

function log(str, color = 'blue') {
  console.log(chalk[color](str));
}

function show(text) {
  return lolcatjs.fromString(
    cowsay.say({
      text,
    })
  );
}

function bingo() {
  return Math.random() > 0.95;
}

module.exports = {
  pad2,
  format,
  log,
  getDate,
  bingo,
  show,
};
