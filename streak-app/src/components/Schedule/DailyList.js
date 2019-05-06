import React, { useContext } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Menu from '@material-ui/core/Menu';
import MenuList from '@material-ui/core/MenuList';
import { Link } from 'react-router-dom';
import { UserContext } from '../../Root';
import CompleteTask from './CompleteTask';
import * as moment from 'moment';

const DailyList = ({ classes, schedules }) => {
  const currentUser = useContext(UserContext);

  //I want to have on this page the tasks for today for the owner
  //need to find id of the owner
  return (
    <List>
      {schedules.schedule.map(today => {
        console.log(moment().format('MMM Do, YYYY'));
        console.log(today);
        if (
          today.partner1.username === currentUser.username ||
          today.partner2.username === currentUser.username
        ) {
          return (
            <div key={today.id}>
              <div>Today is {moment().format('MMM Do, YYYY')}</div>
              <div>This is your tasks for today:</div>
              <ListItem>
                {today.taskSet.map(task => (
                  <div>
                    <ListItemText
                      primaryTypographyProps={{
                        variant: 'subheading',
                        color: 'primary',
                      }}
                      primary={task.title.toUpperCase()}
                    />
                    <ListItemText primary={task.completed} />
                    <CompleteTask task={task} />
                    {/* Update Complete */}
                  </div>
                ))}
              </ListItem>
            </div>
          );
        }
      })}
    </List>
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
