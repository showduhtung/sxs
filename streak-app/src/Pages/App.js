import React, { useState } from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import withStyles from '@material-ui/core/styles/withStyles';

// import SearchTracks from '../components/Track/SearchTracks';
// import TrackList from '../components/Track/TrackList';
// import CreateTrack from '../components/Track/CreateTrack';
import Loading from '../components/Shared/Loading';
import Error from '../components/Shared/Error';

const App = ({ classes }) => {
  // const [searchResults, setSearchResults] = useState([]);
  return (
    <div className={classes.container}>
      {/* <SearchTracks setSearchResults={setSearchResults} /> */}
      {/* <CreateTrack /> */}
      <Query query={GET_SCHEDULES_QUERY}>
        {({ data, loading, error }) => {
          if (loading) return <Loading />;
          if (error) return <Error error={error} />;
          return JSON.stringify(data);
          // const tracks = searchResults.length > 0 ? searchResults : data.tracks;
          // return <TrackList tracks={tracks} />;
        }}
      </Query>

      {/* <TrackList /> */}
    </div>
  );
};

export const GET_SCHEDULES_QUERY = gql`
  {
    schedule {
      id
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