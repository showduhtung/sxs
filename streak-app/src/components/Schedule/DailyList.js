import React, { useState, useContext, useEffect } from 'react';
import List from '@material-ui/core/List';
import FriendClick from '../Friend/FriendClick';
import { UserContext } from '../../Root';
import AddFriend from '../Friend/AddFriend';
import AddTask from '../Task/AddTask';
import ListTask from '../Task/ListTask';
import * as moment from 'moment';
import { convertToday } from '../Shared/CalendarLogic';
const today = convertToday();
console.log(today);

const DailyList = ({ classes, schedules, allUsers }) => {
  const currentUser = useContext(UserContext);
  const [friends, setFriends] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [scheduleId, setScheduleId] = useState(-1);
  const [thisFriend, setThisFriend] = useState('');
  const [username, setUsername] = useState('');

  const allPeople = [];

  //make all users list
  for (let k = 0; k < allUsers.allUsers.length; k++) {
    allPeople.push(allUsers.allUsers[k].username);
  }

  let allFriends = [];

  //which friend?
  const handleFriendClick = chosenFriend => {
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
        }
      }
    }
  };

  //make an array of all friends
  for (let i = 0; i < schedules.schedule.length; i++) {
    if (currentUser.username === schedules.schedule[i].partner1.username) {
      allFriends.push(schedules.schedule[i].partner2.username);
    } else if (
      currentUser.username === schedules.schedule[i].partner2.username
    ) {
      allFriends.push(schedules.schedule[i].partner1.username);
    }
  }

  useEffect(() => {
    setFriends([...allFriends]);
  }, []);

  return (
    <div>
      These are my friends:
      {friends.map(friend => (
        <FriendClick
          key={friend}
          schedules={schedules}
          allUsers={allUsers}
          setThisFriend={setThisFriend}
          setTasks={setTasks}
          setScheduleId={setScheduleId}
          chosenFriend={friend}
          tasks={tasks}
        />
      ))}
      Reset:
      {
        <FriendClick
          schedules={schedules}
          allUsers={allUsers}
          setThisFriend={setThisFriend}
          setTasks={setTasks}
          setScheduleId={setScheduleId}
          chosenFriend={'I have no friends'}
        />
      }
      <div>Today is {moment().format('MMM Do, YYYY')}</div>
      <div>This is your tasks for today with {thisFriend.toUpperCase()}:</div>
      {
        <List>
          {tasks.map(task => (
            <ListTask task={task} tasks={tasks} setTasks={setTasks} />
          ))}
        </List>
      }
      <AddFriend
        schedules={schedules}
        allFriends={allFriends}
        username={username}
        setUsername={setUsername}
        setTasks={setTasks}
        handleFriendClick={handleFriendClick}
        allPeople={allPeople}
        friends={friends}
        setFriends={setFriends}
      />
      <AddTask
        schedules={schedules}
        allFriends={allFriends}
        scheduleId={scheduleId}
        setTasks={setTasks}
        tasks={tasks}
      />
    </div>
  );
};

// const styles = {
//   root: {
//     display: 'flex',
//     flexWrap: 'wrap',
//   },
//   details: {
//     alignItems: 'center',
//   },
//   link: {
//     color: '#424242',
//     textDecoration: 'none',
//     '&:hover': {
//       color: 'black',
//     },
//   },
// };

export default DailyList;
