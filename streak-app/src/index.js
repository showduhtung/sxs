import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import Auth from './components/Auth';
import * as serviceWorker from './serviceWorker';

import { ApolloProvider, Query } from 'react-apollo';
import ApolloClient, { gql } from 'apollo-boost';

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql/',
  fetchOptions: {
    credentials: 'include',
  },

  //authorization with token to access me/etc queries/mutations
  request: operation => {
    const token = localStorage.getItem('authToken') || '';
    operation.setContext({
      headers: {
        Authorization: `JWT ${token}`,
      },
    });
  },

  //1. when the website starts, it looks at clientState and changes values of client which is fed through apollo provider

  clientState: {
    defaults: {
      //2. it'll check by looking in localStorage for 'authToken' and then change the isLoggedIn status
      isLoggedIn: !!localStorage.getItem('authToken'),
    },
  },
});

//3. makes client query constant, which verifies true/false(?)
const IS_LOGGED_IN_QUERY = gql`
  query {
    isLoggedIn @client
  }
`;

ReactDOM.render(
  <ApolloProvider client={client}>
    <Query query={IS_LOGGED_IN_QUERY}>
      {({ data }) => {
        return data.isLoggedIn ? <Root /> : <Auth />;
      }}
    </Query>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
