import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import withStyles from '@material-ui/core/styles/withStyles';
import DailyList from '../components/Schedule/DailyList';

// import SearchTracks from '../components/Track/SearchTracks';
// import TrackList from '../components/Track/TrackList';
// import CreateTrack from '../components/Track/CreateTrack';
import Loading from '../components/Shared/Loading';
import Error from '../components/Shared/Error';

const App = ({ classes }) => {
  return (
    <div className={classes.container}>
      <Query query={GET_SCHEDULES_QUERY} fetchPolicy="cache-and-network">
        {({ data: schedules, loading: loadingOne, error }) => {
          // if (loading) return <Loading />;
          // if (error) return <Error error={error} />;
          // return <DailyList schedules={data} />;
          return (
            <Query query={GET_USERS_QUERY} fetchPolicy="cache-and-network">
              {({ data: allUsers, loading: loadingTwo, error }) => {
                if (loadingOne || loadingTwo) return <Loading />;
                if (error) return <Error error={error} />;
                return <DailyList schedules={schedules} allUsers={allUsers} />;
              }}
            </Query>
          );
        }}
      </Query>
    </div>
  );
};

export const GET_SCHEDULES_QUERY = gql`
  {
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
        completed
        createdAt
      }
    }
  }
`;

const GET_USERS_QUERY = gql`
  {
    allUsers {
      id
      username
    }
  }
`;

const styles = theme => ({
  container: {
    margin: '0 auto',
    maxWidth: 960,
    padding: theme.spacing.unit * 2,
  },
});

export default withStyles(styles)(App);
