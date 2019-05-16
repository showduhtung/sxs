import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  FormControl,
  Input,
  InputLabel,
  Paper,
  Slide,
  Typography,
  // VerifiedUserTwoTone,
} from '@material-ui/core';
import Gavel from '@material-ui/icons/Gavel';
import Error from '../Shared/Error';

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

const Register = ({ setNewUser }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);
  const handleSubmit = (event, createUser) => {
    event.preventDefault();
    createUser();
  };
  return (
    <div>
      <Paper>
        Register as Existing User
        <Avatar>
          <Gavel />
        </Avatar>
        <Typography variant="headline">Register</Typography>
        <Mutation
          mutation={REGISTER_MUTATION}
          variables={{ username, email, password }}
          onCompleted={data => {
            setOpen(true);
          }}
        >
          {(createUser, { loading, error }) => {
            return (
              <form
                onSubmit={event => handleSubmit(event, createUser)}
                // className={classes.form}
              >
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="username">UserName</InputLabel>
                  <Input
                    id="username"
                    onChange={event => setUsername(event.target.value)}
                  />
                </FormControl>

                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="email">Email</InputLabel>
                  <Input
                    id="email"
                    type="email"
                    onChange={event => setEmail(event.target.value)}
                  />
                </FormControl>

                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input
                    id="password"
                    type="password"
                    onChange={event => setPassword(event.target.value)}
                  />
                </FormControl>

                {/** Buttons */}

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="secondary"
                  // className={classes.submit}
                  disabled={
                    loading ||
                    !username.trim() ||
                    !email.trim() ||
                    !password.trim()
                  }
                >
                  {loading ? 'Register...' : 'Registered'}
                </Button>

                <Button
                  onClick={() => {
                    setNewUser(false);
                  }}
                  fullWidth
                  variant="outlined"
                  color="primary"
                >
                  Previous User? Log in here
                </Button>
                {/* Error Handling */}
                {error && <Error error={error} />}
              </form>
            );
          }}
        </Mutation>
      </Paper>

      {/* Success Dialog Area */}
      <Dialog
        open={open}
        disableBackdropClick={true}
        TransitionComponent={Transition}
      >
        <DialogTitle>
          {/* <VerifiedUserTwoTone className={classes.icon} /> */}
          New Account
        </DialogTitle>
        <DialogContentText>User successfully created!</DialogContentText>

        <DialogActions>
          <Button
            color="primary"
            variant="contained"
            onClick={() => setNewUser(false)}
          >
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const REGISTER_MUTATION = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      user {
        username
        email
      }
    }
  }
`;

export default Register;
