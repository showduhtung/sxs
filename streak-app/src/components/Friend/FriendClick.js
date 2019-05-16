import React, { useContext } from 'react';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import { UserContext } from '../../Root';
import Button from '@material-ui/core/Button';
import { GET_SCHEDULES_QUERY } from '../../Pages/App';
import Error from '../Shared/Error';
import {
  calendarLogic,
  convertToday,
  subtractDay,
} from '../Shared/CalendarLogic';

const today = convertToday();
const FriendClick = ({
  classes,
  schedules,
  allUsers,
  setThisFriend,
  setTasks,
  setScheduleId,
  chosenFriend,
  tasks,
}) => {
  const currentUser = useContext(UserContext);
  const handleClick = async (chosenFriend, createDate) => {
    if (chosenFriend === 'I have no friends') {
      setThisFriend('');
      setTasks([]);
      setScheduleId(-1);
    } else {
      setThisFriend(chosenFriend);
      for (let j = 0; j < schedules.schedule.length; j++) {
        if (
          (currentUser.username === schedules.schedule[j].partner1.username &&
            chosenFriend === schedules.schedule[j].partner2.username) ||
          (currentUser.username === schedules.schedule[j].partner2.username &&
            chosenFriend === schedules.schedule[j].partner1.username)
        ) {
          setScheduleId(schedules.schedule[j].id);
          setTasks(schedules.schedule[j].taskSet);
          for (let k = 0; k < schedules.schedule[j].taskSet.length; k++) {
            let exceptionHash = {};
            let x = schedules.schedule[j].taskSet[k];
            exceptionHash['title'] = x.title;
            exceptionHash['createdAt'] = x.createdAt;
            exceptionHash['id'] = x.id;
            let calendarArr = [];
            x.date.forEach(l => calendarArr.push(l.day));
            exceptionHash['exceptionDays'] = calendarArr;

            let createdAtArr = schedules.schedule[j].taskSet[k].createdAt.split(
              '-'
            );
            let createdAt = [
              parseInt(createdAtArr[1]),
              parseInt(createdAtArr[2]),
              parseInt(createdAtArr[0]),
            ];

            let difference =
              calendarLogic(createdAt) -
              schedules.schedule[j].taskSet[k].date.length +
              1;

            let dayStr = '';

            let dayToString = today;

            while (difference > 0) {
              if (!exceptionHash.exceptionDays.includes(dayToString)) {
                dayStr += dayToString + ',';
              }
              dayToString = subtractDay(dayToString);
              difference--;
            }

            dayStr = dayStr.substring(0, dayStr.length - 1);

            !(dayStr === '')
              ? await createDate({
                  variables: {
                    taskId: exceptionHash.id,
                    days: dayStr,
                    day: '',
                  },
                })
              : console.log('Date already created');
          }
        }
      }
    }
  };

  return (
    <Mutation mutation={CALIBRATE_TASK_MUTATION}>
      {(createDate, { loading, error }) => {
        if (error) return <Error error={error} />;
        return (
          <Button onClick={() => handleClick(chosenFriend, createDate)}>
            {chosenFriend === 'I have no friends' ? 'Reset' : chosenFriend}
          </Button>
        );
      }}
    </Mutation>
  );
};

const CALIBRATE_TASK_MUTATION = gql`
  mutation($taskId: Int!, $days: String!, $day: String!) {
    createDate(taskId: $taskId, days: $days, day: $day) {
      task {
        title
        date {
          day
          completed
        }
      }
    }
  }
`;

export default FriendClick;
