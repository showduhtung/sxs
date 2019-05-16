import React from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  Card,
  CardActionArea,
  CardContent,
} from '@material-ui/core';
import dateFns from 'date-fns';
import * as moment from 'moment';

const Calendar = ({ task, completion }) => {
  const today = new Date();
  // console.log(today);
  // const { selectedDate } = props;
  const monthStart = dateFns.startOfMonth(today);
  const monthEnd = dateFns.endOfMonth(monthStart);
  const startDate = dateFns.startOfWeek(monthStart);
  const endDate = dateFns.endOfWeek(monthEnd);

  const weekdays = [
    { id: 0, day: 'Sun' },
    { id: 1, day: 'Mon' },
    { id: 2, day: 'Tue' },
    { id: 3, day: 'Wed' },
    { id: 4, day: 'Thu' },
    { id: 5, day: 'Fri' },
    { id: 6, day: 'Sat' },
  ];

  const eachWeek = [];
  let daysOfWeek = [];

  let day = startDate;
  let end = endDate;
  let formattedDate;
  const dateFormat = 'D';

  let weekNumber = 1;

  console.log(task);
  // console.log(completion);

  const isSameDay = (x, formatDate) => {
    // console.log(formatDate);
    if (formatDate.length === 1) formatDate = '0' + formatDate;
    for (let i = 0; i < x.length; i++) {
      console.log(x[i].day);

      console.log(x[i].day.slice(8, 10));
      if (x[i].day.slice(8, 10) === formatDate) {
        return x[i].completed;
      }
    }
    return 0;
  };

  // const smileyLogic = ()

  while (day <= end) {
    for (let i = 0; i < 7; i++) {
      formattedDate = dateFns.format(day, dateFormat);
      // console.log(formattedDate);
      const cloneDay = day;

      daysOfWeek.push(
        <TableCell key={formattedDate}>
          <CardActionArea
            // onClick={() => props.onDateClick(dateFns.parse(cloneDay))}
            style={{ height: '100%' }}
          >
            <Card
              style={{
                backgroundColor: 'rgba(0,0,0,0)',
                height: '100%',
              }}
            >
              <CardContent>
                {dateFns.isSameDay(day, today) ? (
                  <Typography
                    align="center"
                    color="primary"
                    style={{ fontSize: '20px' }}
                  >
                    {formattedDate}
                  </Typography>
                ) : (
                  <Typography
                    align="center"
                    style={{
                      color: 'rgba(128,128,128,1)',
                    }}
                  >
                    {formattedDate}
                  </Typography>
                )}
                {isSameDay(task.date, formattedDate)}
              </CardContent>
            </Card>
          </CardActionArea>
        </TableCell>
      );

      day = dateFns.addDays(day, 1);
    }

    let thisWeek = [];
    // while

    eachWeek.push(<TableRow key={weekNumber}>{daysOfWeek}</TableRow>);
    // console.log(eachWeek);
    daysOfWeek = [];
    weekNumber += 1;
  }
  return (
    <Table style={{ height: '90%' }}>
      <TableHead>
        {/* {moment().format('MMMM')} */}
        <TableRow>
          {weekdays.map(day => (
            <TableCell key={day.id}>
              <Typography align="center">{day.day}</Typography>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>{eachWeek[2]}</TableBody>
    </Table>
  );
};

export default Calendar;
