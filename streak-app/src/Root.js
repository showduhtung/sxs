import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// import withRoot from './withRoot';
import App from './Pages/App';
import Profile from './Pages/Profile';
import Header from './Pages/Header';
import Loading from './components/Shared/Loading';
import Error from './components/Shared/Error';

export const UserContext = React.createContext();

const Root = () => (
  <Query query={ME_QUERY} fetchPolicy="cache-and-network">
    {({ data, loading, error }) => {
      if (loading) return <Loading />;
      if (error) return <Error error={error} />;
      const currentUser = data.me;

      return (
        <Router>
          <UserContext.Provider value={currentUser}>
            <Header />
            <Switch>
              <Route exact path="/" component={App} />
              <Route path="/profile/:id" component={Profile} />
            </Switch>
          </UserContext.Provider>
        </Router>
      );
    }}
  </Query>
);

// const GET_TRACKS_QUERY = gql`
//   {
//     tracks {
//       id
//       title
//       description
//       url
//     }
//   }
// `;

export const ME_QUERY = gql`
  {
    me {
      id
      username
    }
  }
`;

export default Root;
