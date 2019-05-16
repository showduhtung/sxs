import React from 'react';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import Error from '../Shared/Error';
import Button from '@material-ui/core/Button';
import { convertToday } from '../Shared/CalendarLogic';

const CompleteTask = (task, tasks, setTasks) => {
  const handleClick = async (id, updateTask) => {
    const today = convertToday();

    await updateTask({ variables: { taskId: id, day: today } });
    let task2 = task.tasks.map(a => {
      return { ...a };
    });
    console.log(task.tasks, 'increment');
    let arr = task2.find(a => a.title === task.task.title).date;
    console.log(arr);
    if (arr) {
      arr.find(a => a.day === today).completed++;
    }
    task.setTasks([...task2]);
  };
  return (
    <>
      <Mutation mutation={COMPLETE_TASK_MUTATION}>
        {(updateTask, { loading, error }) => {
          if (error) return <Error error={error} />;
          return (
            <Button onClick={() => handleClick(task.task.id, updateTask)}>
              Finished
            </Button>
          );
        }}
      </Mutation>
    </>
  );
};

const COMPLETE_TASK_MUTATION = gql`
  mutation($taskId: Int!, $day: String!) {
    incrementTask(taskId: $taskId, day: $day) {
      task {
        title
        date {
          day
          completed
        }
      }
    }
  }
`;

export default CompleteTask;
