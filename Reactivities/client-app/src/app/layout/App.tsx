import { Fragment, useEffect, useState } from 'react'
import axios from 'axios';
import { Container, Header, List } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './navbar';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]); { /*First param is value, second is the function used to set the value, [] means no initial states*/ }

  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/activities')
      .then(responce => {
        setActivities(responce.data);
      })
  }, []); { /*Second parameter are the dependencies, so when a dependency changes, the useEffect method gets called again */ }

  return (
    <Fragment> {/* We can only return one "return styled" component, e.g navbar or container. So we encapsulate all within one component (div/frag). */}
      <NavBar />
      <Container style={{ marginTop: '7em' }}>
        <List>
          {activities.map((activity) => (
            <List.Item key={activity.id}>
              {activity.title}
            </List.Item>
          ))}
        </List>
      </Container>

    </Fragment>
  )
}

export default App
