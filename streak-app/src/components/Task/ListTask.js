import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CompleteTask from './CompleteTask';
import { convertToday } from '../Shared/CalendarLogic';
import Calendar from '../Schedule/Calendar';
const today = convertToday();

const ListTask = ({ task, tasks, setTasks }) => {
  const [open, setOpen] = useState(false);

  return (
    <div key={task.id}>
      <ListItemText
        primaryTypographyProps={{
          variant: 'subheading',
          color: 'primary',
        }}
        primary={task.title}
      />
      <ListItem>
        {open === false ? (
          <>
            <ListItemText
              primary={task.date.filter(x => x.day === today)[0].completed}
            />

            <CompleteTask task={task} tasks={tasks} setTasks={setTasks} />
            <Button onClick={() => setOpen(true)}> See This Week</Button>
          </>
        ) : (
          <ListItem key={task.id}>
            <Calendar
              completion={task.date.filter(x => x.day === today)[0].completed}
              task={task}
            />
            <Button onClick={() => setOpen(false)}> See Today</Button>
          </ListItem>
        )}
      </ListItem>
    </div>
  );
};

export default ListTask;
