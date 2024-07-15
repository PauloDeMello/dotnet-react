import { Fragment, useEffect, useState } from 'react'
import { Container } from 'semantic-ui-react';
import NavBar from './navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import LoadingComponent from './LoadingComponents';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {
  const { activityStore } = useStore();

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]); { /*Second parameter are the dependencies, so when a dependency changes, the useEffect method gets called again */ }

  if (activityStore.loadingInitial) return <LoadingComponent content='Loading app' />

  return (
    <Fragment> {/* We can only return one "return styled" component, e.g navbar or container. So we encapsulate all within one component (div/frag). */}
      <NavBar />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard />
      </Container>

    </Fragment>
  )
}

export default observer(App);
