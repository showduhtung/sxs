import React, { useState } from 'react';

// import withRoot from '../../withRoot';
import Login from './Login';
import Register from './Register';

export default () => {
  const [newUser, setNewUser] = useState(true);
  // console.log(newUser);

  return newUser ? (
    <Register setNewUser={setNewUser} />
  ) : (
    <Login setNewUser={setNewUser} />
  );
};
