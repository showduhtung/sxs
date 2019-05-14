import React, { useContext } from 'react';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import { UserContext } from '../../Root';
import Button from '@material-ui/core/Button';
import { GET_SCHEDULES_QUERY } from '../../Pages/App';

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
  const handleClick = chosenFriend => {
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
    console.log(tasks, 'tasks');
  };
  // console.log(schedules, 'aksdjsdjk', tasks);
  const calibrateTasks = () => {};
  console.log(chosenFriend);
  return (
    // <Mutation mutation={CALIBRATE_TASK_MUTATION} variables={{ trackId: track.id }}>
    <Button onClick={() => handleClick(chosenFriend)}>
      {chosenFriend === 'I have no friends' ? 'Reset' : chosenFriend}
    </Button>
    // </Mutation>
  );
};

const CALIBRATE_TASK_MUTATION = gql`
  mutation($daysSince: Int!, $taskId: Int!) {
    updateTask(daysSince: $daysSince, taskId: $taskId) {
      schedule {
        id
        partner1 {
          username
        }
        partner2 {
          username
        }
        taskSet {
          id
          title
          completed
          createdAt
        }
      }
    }
  }
`;

export default FriendClick;

//1) if schedules/tasks don't exist between two, create schedule/tasks
//2) make multiple tasks based on createdAt
