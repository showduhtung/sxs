import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import Error from '../Shared/Error';
// import Button from '@material-ui/core/Button';
// import Menu from '@material-ui/core/Menu';
// import MenuList from '@material-ui/core/MenuList';
import FormControl from '@material-ui/core/FormControl';
// import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
// import { UserContext } from '../../Root';
import { GET_SCHEDULES_QUERY } from '../../Pages/App';

const AddTask = ({ schedules, allFriends, scheduleId, setTasks, tasks }) => {
  const [task, setTask] = useState('');

  const handleSubmit = async (event, createTask, scheduleId) => {
    event.preventDefault();
    if (scheduleId === -1) alert('choose a friend first');
    else {
      await createTask({
        variables: {
          title: task,
          scheduleId: scheduleId,
          description: '',
        },
      });
      setTask('');
    }
  };
  return (
    <>
      <Mutation
        mutation={CREATE_TASK_MUTATION}
        onCompleted={data => {
          console.log(data);
          setTasks([...tasks].concat(data.createTask.task));
        }}
        refetchQueries={() => [{ query: GET_SCHEDULES_QUERY }]}
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
                  value={task}
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
        completed
      }
    }
  }
`;
export default AddTask;
