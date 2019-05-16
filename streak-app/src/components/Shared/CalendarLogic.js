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

//What is today?
let todayArr = [];
let todayArray = moment()
  .format('l')
  .split('/');
for (let i = 0; i < todayArray.length; i++) {
  todayArr.push(parseInt(todayArray[i]));
}

//Is it a leap year or not? Feb 28 or 29?
let year = moment().format('YYYY');
let FebNumberOfDays = year % 4 === 0 ? 29 : 28;
let dayPerMonth = [31, FebNumberOfDays, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

//What was a month ago?
// let dayOfMonthBeforeFromToday =
//   dayPerMonth[today[0] === 1 ? 11 : today[0] - 2] - (28 - today[1]);

// let arrOfMonthBeforeFromToday = [
//   today[0] === 1 ? 12 : today[0] - 1,
//   dayOfMonthBeforeFromToday - dayNames[moment().format('dddd')],
//   today[0] === 1 ? today[2] - 1 : today[2],
// ];

const whatDay = arr => {
  let sumDays = 0;
  if (arr[0] === 1) sumDays = 0;
  else {
    for (let j = 0; j < arr[0] - 1; j++) {
      sumDays += dayPerMonth[j];
    }
  }
  sumDays += arr[1];
  return sumDays;
};

export const calendarLogic = created => {
  let difference = 0;
  if (todayArr[2] === created[2]) {
    let allDayToday = whatDay(todayArr);
    let allDayCreated = whatDay(created);
    difference = allDayToday - allDayCreated;
  }
  return difference > 27 ? 28 : difference;
};

export const convertToday = () => {
  const convertedArr = [
    todayArr[2].toString(),
    todayArr[0].toString().length === 1
      ? '0' + todayArr[0].toString()
      : todayArr[0].toString(),
    todayArr[1].toString().length === 1
      ? '0' + todayArr[1].toString()
      : todayArr[1].toString(),
  ].join('-');

  return convertedArr;
};

export const subtractDay = day => {
  let dayToArr = [];
  let dayToArray = day.split('-');

  dayToArray.forEach(x => dayToArr.push(parseInt(x)));

  if (dayToArr[2] === 1) {
    dayToArr[2] = dayPerMonth[dayToArr[1] - 1];
    if (dayToArr[1] === 1) {
      dayToArr[1] = 12;
      dayToArr[0]--;
    } else {
      dayToArr[1]--;
    }
    dayToArr[2] = dayPerMonth[dayToArr[1] - 1];
    return dayToArr;
  }

  dayToArr[2]--;

  let dayString = [
    dayToArr[0].toString(),
    dayToArr[1].toString().length === 1
      ? '0' + dayToArr[1].toString()
      : dayToArr[1].toString(),
    dayToArr[2].toString().length === 1
      ? '0' + dayToArr[2].toString()
      : dayToArr[2].toString(),
  ].join('-');

  return dayString;
};

export const today = moment().format('dddd');
// export const startDate =
// export const endDate =
