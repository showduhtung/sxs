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

//1. mutate to create a schedule between me and friend
//2. Then update to dom, similar to complete task

const AddFriend = ({ schedules }) => {
  // const handleClick = async (id, updateTask) => {
  //   //update backend
  //   let { data } = await updateTask({ variables: { taskId: id } });
  // };
  const [username, setUsername] = useState('');

  const currentUser = useContext(UserContext);
  const allPeople = [];
  for (let i = 0; i < schedules.schedule.length; i++) {
    if (currentUser.username !== schedules.schedule[i].partner1.username) {
      allPeople.push(schedules.schedule[i].partner1.username);
    }

    if (currentUser.username !== schedules.schedule[i].partner2.username) {
      allPeople.push(schedules.schedule[i].partner2.username);
    }
  }

  console.log('allpeople', allPeople);

  const handleSubmit = event => {
    event.preventDefault();
    // console.log('handleSubmit');
  };

  return (
    <form onSubmit={event => handleSubmit(event)}>
      <FormControl margin="normal" required fullWidth>
        <InputLabel htmlFor="username">Add Friend's username</InputLabel>
        <Input
          id="username"
          onChange={event => setUsername(event.target.value)}
        />
      </FormControl>
    </form>
    // <Mutation
    //   mutation={ADD_FRIEND_MUTATION}
    //   onCompleted={data => {
    //     console.log('hello completeTask', data);
    //   }}
    // >
    // {(updateTask, { loading, error }) => {
    //     if (error) return <Error error={error} />;
    //     return <Button onClick={() => handleClick()}>Add Friend</Button>;
    //   }}
    // </Mutation>
  );
};

const ADD_FRIEND_MUTATION = gql`
  mutation($partner1: String!, $partner2: String!) {
    createSchedule(partner1: $partner1, partner2: $partner2) {
      schedule {
        id
        partner1
        partner2
      }
    }
  }
`;

export default AddFriend;
