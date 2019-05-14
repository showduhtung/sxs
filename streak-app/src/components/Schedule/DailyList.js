import React, { useState, useContext, useEffect } from 'react';
// import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import FriendClick from './FriendClick';
import { UserContext } from '../../Root';
import CompleteTask from './CompleteTask';
import AddFriend from './AddFriend';
import AddTask from './AddTask';
import * as moment from 'moment';

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
        // <Button key={friend} onClick={() => handleFriendClick(friend)}>
        //   {friend}
        // </Button>
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
        // <Button onClick={() => handleFriendClick('I have no friends')}>
        //   Reset
        // </Button>
      }
      <div>Today is {moment().format('MMM Do, YYYY')}</div>
      <div>This is your tasks for today with {thisFriend}:</div>
      {
        <List>
          {tasks.map(task => (
            <div key={task.id}>
              <ListItem>
                <ListItemText
                  primaryTypographyProps={{
                    variant: 'subheading',
                    color: 'primary',
                  }}
                  primary={task.title}
                />
                <ListItemText primary={task.completed} />
                <CompleteTask task={task} tasks={tasks} setTasks={setTasks} />
              </ListItem>
            </div>
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
