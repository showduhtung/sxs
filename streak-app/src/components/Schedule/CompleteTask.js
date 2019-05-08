import React from 'react';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import Error from '../Shared/Error';
import Button from '@material-ui/core/Button';

const CompleteTask = task => {
  const handleClick = (id, updateTask) => {
    console.log('handleClick', id, 'break', updateTask);
    let res = updateTask({ variables: { taskId: id } });
    console.log(res);
  };
  return (
    <>
      <Mutation
        mutation={COMPLETE_TASK_MUTATION}
        onCompleted={data => {
          console.log('hello completeTask', data);
        }}
      >
        {(updateTask, { loading, error }) => {
          if (error) return <Error error={error} />;
          return (
            <Button onClick={() => handleClick(task.task.id, updateTask)}>
              {console.log(task)}
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
