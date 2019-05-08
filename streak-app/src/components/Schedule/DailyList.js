import React, { useState, useContext, useEffect } from 'react';
// import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
// import Typography from '@material-ui/core/Typography';
// import ExpansionPanel from '@material-ui/core/ExpansionPanel';
// import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
// import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
// import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import Menu from '@material-ui/core/Menu';
// import MenuList from '@material-ui/core/MenuList';
// import { Link } from 'react-router-dom';
import { UserContext } from '../../Root';
import CompleteTask from './CompleteTask';
import AddFriend from './AddFriend';
import AddTask from './AddTask';
import * as moment from 'moment';

// export const TaskContext = React.createContext();

const DailyList = ({ classes, schedules }) => {
  const currentUser = useContext(UserContext);
  const [friends, setFriends] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [scheduleId, setScheduleId] = useState(-1);
  const [thisFriend, setThisFriend] = useState('');

  //my little hack to fix up the states
  let allFriends = [];
  let allTasks = [];
  let scheduleArrayId = -1;
  // console.log(schedules.schedule);

  const handleFriendClick = chosenFriend => {
    if (chosenFriend === 'I have no friends') {
      setThisFriend('');
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
          allTasks = [...allTasks, ...schedules.schedule[j].taskSet];
        }
      }
    }
  };

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
    setTasks([...allTasks]);
  }, []);

  return (
    <div>
      These are my friends:
      {friends.map(friend => (
        <Button key={friend} onClick={() => handleFriendClick(friend)}>
          {friend}
        </Button>
      ))}
      Reset:
      {
        <Button onClick={() => handleFriendClick('I have no friends')}>
          Reset
        </Button>
      }
      <div>Today is {moment().format('MMM Do, YYYY')}</div>
      <div>This is your tasks for today with {thisFriend}:</div>
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
      <AddFriend schedules={schedules} allFriends={allFriends} />
      <AddTask
        schedules={schedules}
        allFriends={allFriends}
        scheduleId={scheduleId}
      />
      {/* <Button>Add Friend</Button> */}
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
