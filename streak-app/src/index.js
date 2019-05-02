import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ApolloProvider, Query } from 'react-apollo';
import ApolloClient, { gql } from 'apollo-boost';
import Auth from './components/Auth';

// const client = new ApolloClient({
//   uri: 'http://localhost:8000/graphql/',
//   // fetchOptions: {
//   //   credentials: 'include',
//   // },
//   // request : operation =>{
//   //   const token = localStorage.getItem('authToken') ||
//   // }
// });

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql/',
  // fetchOptions: {
  //   credentials: 'include',
  // },

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

const IS_LOGGED_IN_QUERY = gql`
  query {
    isLoggedIn @client
  }
`;

ReactDOM.render(
  <ApolloProvider client={client}>
    {/* ^5. gets passed through here^ */}
    <Query query={IS_LOGGED_IN_QUERY}>
      {/** 4. checks if logged in */}

      {({ data }) => {
        console.log(data);
        //5. data comes back as {isLoggedin:true/false}
        return data.isLoggedIn ? <App /> : <Auth />;
      }}
    </Query>
    {/* <Auth /> */}
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
