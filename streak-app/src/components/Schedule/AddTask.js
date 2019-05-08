import React, { useState, useContext } from 'react';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import Error from '../Shared/Error';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuList from '@material-ui/core/MenuList';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { UserContext } from '../../Root';

const AddFriend = ({ schedules, allFriends, scheduleId }) => {
  const [task, setTask] = useState('');
  console.log(
    'schedules',
    schedules,
    'allFriends',
    allFriends,
    'scheduleId',
    scheduleId
  );
  const handleSubmit = async (event, createTask, scheduleId) => {
    event.preventDefault();
    if (scheduleId === -1) alert('choose a friend first');
    else {
      console.log('activated adding task');
      await createTask({
        variables: {
          title: task,
          scheduleId: scheduleId,
          description: '',
        },
      });
    }
  };
  return (
    <>
      <Mutation
        mutation={CREATE_TASK_MUTATION}
        onCompleted={data => {
          console.log('task added', data);
        }}
      >
        {(createTask, { loading, error }) => {
          if (error) return <Error error={error} />;
          return (
            <form
              onSubmit={event => handleSubmit(event, createTask, scheduleId)}
            >
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="task">Add Task</InputLabel>
                <Input
                  id="task"
                  onChange={event => setTask(event.target.value)}
                />
              </FormControl>
            </form>
          );
        }}
      </Mutation>
    </>
  );
};

const CREATE_TASK_MUTATION = gql`
  mutation($title: String!, $scheduleId: Int!, $description: String) {
    createTask(
      title: $title
      scheduleId: $scheduleId
      description: $description
    ) {
      task {
        id
        title
        createdAt
      }
    }
  }
`;
export default AddFriend;
