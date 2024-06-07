import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';

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
      <h1>Reactivities</h1>
      <ul>
        {activities.map((activity: any) => (
          <li key={activity.id}>
            {activity.title};
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
