import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';

function App() {
  const [activities, setActivities] = useState([]); { /*First param is value, second is the function used to set the value, [] means no initial states*/ }

  useEffect(() => {
    axios.get('http://localhost:5000/api/activities')
      .then(responce => {
        setActivities(responce.data);
      })
  }, []); { /*Second parameter are the dependencies, so when a dependency changes, the useEffect method gets called again */ }

  return (
    <div>
      <Header as="h2" icon='users' content='Reactivities' />
      <List>
        {activities.map((activity: any) => (
          <List.Item key={activity.id}>
            {activity.title}
          </List.Item>
        ))}
      </List>
    </div>
  )
}

export default App
