import React, { useState, useContext } from 'react';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import Error from '../Shared/Error';
import Button from '@material-ui/core/Button';

const CompleteTask = task => {
  const hello = 1;
  console.log(task);
  const handleClick = async (id, updateTask) => {
    await updateTask({ variables: { taskId: id } });
  };
  return (
    <>
      <Mutation mutation={COMPLETE_TASK_MUTATION}>
        {(updateTask, { loading, error }) => {
          if (error) return <Error error={error} />;
          return (
            <Button onClick={() => handleClick(task.id, updateTask)}>
              Completed
            </Button>
          );
        }}
      </Mutation>
    </>
  );
};

const COMPLETE_TASK_MUTATION = gql`
  mutation($taskId: Int!) {
    updateTask(taskId: $taskId) {
      task {
        title
        completed
      }
    }
  }
`;

export default CompleteTask;
