import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import withStyles from '@material-ui/core/styles/withStyles';
import DailyList from '../components/Schedule/DailyList';
// import * as moment from 'moment';
import // calendarLogic,
// convertToday,
// subtractDay,
'../components/Shared/CalendarLogic';
import Loading from '../components/Shared/Loading';
import Error from '../components/Shared/Error';
// const today = convertToday();

const App = ({ classes }) => {
  return (
    <div className={classes.container}>
      <Query query={GET_SCHEDULES_QUERY} fetchPolicy="cache-and-network">
        {({ data: schedules, loading: loadingOne, error }) => {
          return (
            <>
              <Query query={GET_USERS_QUERY} fetchPolicy="cache-and-network">
                {({ data: allUsers, loading: loadingTwo, error }) => {
                  if (loadingOne || loadingTwo) return <Loading />;
                  if (error) return <Error error={error} />;

                  return (
                    // <CalibrateSchedule
                    //   schedules={schedules}
                    //   allUsers={allUsers}
                    // />
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
        createdAt
        date {
          id
          completed
          day
        }
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
