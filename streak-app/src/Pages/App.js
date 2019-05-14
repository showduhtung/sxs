import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import withStyles from '@material-ui/core/styles/withStyles';
import DailyList from '../components/Schedule/DailyList';
import * as moment from 'moment';
import calendarLogic from '../components/Schedule/CalendarLogic';

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
          if (schedules.schedule) {
            for (let i = 0; i < schedules.schedule.length; i++) {
              for (let j = 0; j < schedules.schedule[i].taskSet.length; j++) {
                let createdAtArr = schedules.schedule[i].taskSet[
                  j
                ].createdAt.split('-');
                let createdAt = [
                  parseInt(createdAtArr[1]),
                  parseInt(createdAtArr[2]),
                  parseInt(createdAtArr[0]),
                ];
                console.log(calendarLogic(createdAt));
              }
            }
          }

          console.log(schedules);
          return (
            <>
              <Query query={GET_USERS_QUERY} fetchPolicy="cache-and-network">
                {({ data: allUsers, loading: loadingTwo, error }) => {
                  if (loadingOne || loadingTwo) return <Loading />;
                  if (error) return <Error error={error} />;

                  return (
                    <DailyList schedules={schedules} allUsers={allUsers} />
                  );
                }}
              </Query>
            </>
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
