import { Fragment, useEffect, useState } from 'react'
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { v4 as uuid } from 'uuid';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]); { /*First param is value, second is the function used to set the value, [] means no initial states*/ }
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/activities')
      .then(response => {
        setActivities(response.data);
      })
  }, []); { /*Second parameter are the dependencies, so when a dependency changes, the useEffect method gets called again */ }

  function handleSelectActivity(id: string) {
    setSelectedActivity(activities.find(x => x.id === id));
  }

  function handleCancelSelectActivity() {
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }


  function handleCreateOrEditActivity(activity: Activity) {
    /*spread (...) operator un-nests array allowing for appending e.g [...[1, 1, 2], 7] => [1, 1, 2, 7]*/
    /*so we first filter the array to remove the activity we want to modify, then append the new one*/
    activity.id
      ? setActivities([...activities.filter(x => x.id !== activity.id), activity])
      : setActivities([...activities, { ...activity, id: uuid() }])
    setEditMode(false);
    setSelectedActivity(activity);
  }

  function handleDeleteActivity(id: string) {
    /*deconstructs array and adds all values except the one where the id matches*/
    setActivities([...activities.filter(x => x.id !== id)])
  }

  return (
    <Fragment> {/* We can only return one "return styled" component, e.g navbar or container. So we encapsulate all within one component (div/frag). */}
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}

        />
      </Container>

    </Fragment>
  )
}

export default App
