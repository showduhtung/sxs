import React, { useContext } from 'react';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import Error from '../Shared/Error';

import FormControl from '@material-ui/core/FormControl';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { UserContext } from '../../Root';
import { GET_SCHEDULES_QUERY } from '../../Pages/App';

const AddFriend = ({
  schedules,
  allFriends,
  username,
  setUsername,
  setTasks,
  handleFriendClick,
  allPeople,
  setFriends,
}) => {
  const currentUser = useContext(UserContext);
  const handleSubmit = async (event, createSchedule) => {
    event.preventDefault();
    handleFriendClick();
    if (allPeople.includes(username)) {
      if (allFriends.includes(username)) {
        alert('Already a friend');
      } else {
        await createSchedule({
          variables: { partner1: currentUser.username, partner2: username },
        });
      }
    } else {
      alert("doesn't exist");
    }
  };

  return (
    <>
      <Mutation
        mutation={ADD_FRIEND_MUTATION}
        onCompleted={data => {
          setUsername('');
          setTasks(data.createSchedule.schedule.taskSet);
          setFriends(
            [...allFriends].concat(
              data.createSchedule.schedule.partner2.username
            )
          );
        }}
        refetchQueries={() => [{ query: GET_SCHEDULES_QUERY }]}
      >
        {(createSchedule, { loading, error }) => {
          if (error) return <Error error={error} />;
          return (
            <form onSubmit={event => handleSubmit(event, createSchedule)}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="username">
                  Add Friend's Username
                </InputLabel>

                <Input
                  id="username"
                  value={username}
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
        taskSet {
          id
          title
          createdAt
        }
      }
    }
  }
`;

export default AddFriend;
