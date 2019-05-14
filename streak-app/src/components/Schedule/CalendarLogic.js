import * as moment from 'moment';

let dayNames = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

let today = [];
const todayArr = moment()
  .format('l')
  .split('/');
for (let i = 0; i < todayArr.length; i++) {
  today.push(parseInt(todayArr[i]));
}

const year = moment().format('YYYY');
let FebNumberOfDays = year % 4 === 0 ? 29 : 28;

let dayPerMonth = [31, FebNumberOfDays, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

let dayOfMonthBeforeFromToday =
  dayPerMonth[today[0] === 1 ? 11 : today[0] - 2] - (28 - today[1]);

let arrOfMonthBeforeFromToday = [
  today[0] === 1 ? 12 : today[0] - 1,
  dayOfMonthBeforeFromToday - dayNames[moment().format('dddd')],
  today[0] === 1 ? today[2] - 1 : today[2],
];

const calendarLogic = created => {
  console.log(dayOfMonthBeforeFromToday); //from today this is april 16th
  console.log(arrOfMonthBeforeFromToday);
  if (created[2] >= arrOfMonthBeforeFromToday[2]) {
    if (created[0] >= arrOfMonthBeforeFromToday[0]) {
      if (created[1] >= arrOfMonthBeforeFromToday[1]) {
        return 21 + dayNames[moment().format('dddd')];
      }
    }
  } else {
    return 28;
  }
};

export default calendarLogic;
