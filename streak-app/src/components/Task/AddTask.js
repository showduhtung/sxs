import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import Error from '../Shared/Error';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { GET_SCHEDULES_QUERY } from '../../Pages/App';

import { convertToday } from '../Shared/CalendarLogic';
const today = convertToday();

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
          day: today,
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
  mutation(
    $title: String!
    $scheduleId: Int!
    $description: String
    $day: String!
  ) {
    createTask(
      title: $title
      scheduleId: $scheduleId
      description: $description
      day: $day
    ) {
      task {
        id
        title
        createdAt
        date {
          id
          day
          completed
        }
      }
    }
  }
`;
export default AddTask;
