import React, { useState, useContext, useEffect } from 'react';
// import withStyles from '@material-ui/core/styles/withStyles';
// import Button from '@material-ui/core/Button';
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
import * as moment from 'moment';

// export const TaskContext = React.createContext();

const DailyList = ({ classes, schedules }) => {
  const currentUser = useContext(UserContext);
  const [friends, updateFriends] = useState([]);
  const [tasks, updateTasks] = useState([]);

  //my little hack to fix up the states
  let allFriends = [];
  let allTasks = [];

  for (let i = 0; i < schedules.schedule.length; i++) {
    if (currentUser.username === schedules.schedule[i].partner1.username) {
      allFriends.push(schedules.schedule[i].partner2.username);
      allTasks = [...allTasks, ...schedules.schedule[i].taskSet];
    } else if (
      currentUser.username === schedules.schedule[i].partner2.username
    ) {
      allFriends.push(schedules.schedule[i].partner1.username);
      allTasks = [...allTasks, ...schedules.schedule[i].taskSet];
    }
  }

  useEffect(() => {
    updateFriends([...allFriends]);
    updateTasks([...allTasks]);
  }, []);

  // console.log('tasks', tasks, 'friends', friends);

  return (
    <div>
      These are my friends: {friends}
      <div>Today is {moment().format('MMM Do, YYYY')}</div>
      <div>This is your tasks for today:</div>
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
              <CompleteTask
                task={task}
                tasks={tasks}
                updateTasks={updateTasks}
              />
            </ListItem>
          </div>
        ))}
      </List>
      <AddFriend schedules={schedules} />
      {/* <Button>Add Friend</Button> */}
    </div>
  );
};
//       {schedules.schedule.map(today => {
//         if (
//           today.partner1.username === currentUser.username ||
//           today.partner2.username === currentUser.username
//         ) {
//           return (
//             <div key={today.id}>
//               These are my friends: {friends}
//               <div>Today is {moment().format('MMM Do, YYYY')}</div>
//               <div>This is your tasks for today:</div>
//               <ListItem>
//                 {today.taskSet.map(task => (
//                   <div key={task.id}>
//                     <ListItemText
//                       primaryTypographyProps={{
//                         variant: 'subheading',
//                         color: 'primary',
//                       }}
//                       primary={task.title.toUpperCase()}
//                     />
//                     <ListItemText primary={task.completed} />
//                     <CompleteTask task={task} />
//                   </div>
//                 ))}
//               </ListItem>
//             </div>
//           );
//         }
//       })}
//     </List>
//   );
// };

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
