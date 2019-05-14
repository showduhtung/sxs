import React from 'react';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import Error from '../Shared/Error';
import Button from '@material-ui/core/Button';

const CompleteTask = (task, tasks, setTasks) => {
  const handleClick = async (id, updateTask) => {
    await updateTask({ variables: { taskId: id } });
    let task2 = task.tasks.map(a => {
      return { ...a };
    });
    task2.find(a => a.title === task.task.title).completed++;
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
  mutation($taskId: Int!) {
    incrementTask(taskId: $taskId) {
      task {
        title
        completed
      }
    }
  }
`;

export default CompleteTask;
