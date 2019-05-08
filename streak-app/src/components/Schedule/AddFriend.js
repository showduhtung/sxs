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

const AddFriend = ({ schedules, allFriends }) => {
  // const handleClick = async (id, updateTask) => {
  //   //update backend
  //   let { data } = await updateTask({ variables: { taskId: id } });
  // };
  const [username, setUsername] = useState('');
  console.log(allFriends);

  const currentUser = useContext(UserContext);
  const allPeople = [];
  for (let i = 0; i < schedules.schedule.length; i++) {
    if (
      currentUser.username !== schedules.schedule[i].partner1.username &&
      !allPeople.includes(schedules.schedule[i].partner1.username)
    ) {
      allPeople.push(schedules.schedule[i].partner1.username);
    }

    if (
      currentUser.username !== schedules.schedule[i].partner2.username &&
      !allPeople.includes(schedules.schedule[i].partner2.username)
    ) {
      allPeople.push(schedules.schedule[i].partner2.username);
    }
  }

  // console.log('allpeople, not me', allPeople);

  const handleSubmit = async (event, createSchedule) => {
    event.preventDefault();
    if (allPeople.includes(username)) {
      if (allFriends.includes(username)) {
        alert('Already a friend');
      } else {
        console.log('hello', currentUser.username, username);
        await createSchedule({
          variables: { partner1: currentUser.username, partner2: username },
        });
      }
    }
    setUsername('');
  };

  return (
    <>
      <Mutation
        mutation={ADD_FRIEND_MUTATION}
        onCompleted={data => {
          // console.log('friend added', data);
        }}
      >
        {(createSchedule, { loading, error }) => {
          if (error) return <Error error={error} />;
          return (
            <form onSubmit={event => handleSubmit(event, createSchedule)}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="username">
                  Add Friend's username
                </InputLabel>
                <Input
                  id="username"
                  onChange={event => setUsername(event.target.value)}
                />
              </FormControl>
            </form>
          );
        }}
      </Mutation>
    </>
  );
};

const ADD_FRIEND_MUTATION = gql`
  mutation($partner1: String!, $partner2: String!) {
    createSchedule(partner1: $partner1, partner2: $partner2) {
      schedule {
        id
        partner1 {
          username
        }
        partner2 {
          username
        }
      }
    }
  }
`;

export default AddFriend;
