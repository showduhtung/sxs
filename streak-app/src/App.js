import React from 'react';

import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import './App.css';
import logo from './logo.svg';

function App() {
  return (
    <Query query={GET_TRACKS_QUERY}>
      {({ data, loading, error }) => {
        if (loading) return <div>Loading</div>;
        if (error) return <div>Error</div>;

        return <div>{JSON.stringify(data)}</div>;
      }}
    </Query>
  );
}

const GET_TRACKS_QUERY = gql`
  {
    tasks {
      id
      title
      description
      url
    }
  }
`;

export default App;
