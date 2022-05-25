import {useState} from 'react'

import {BrowserRouter as Router, Route} from 'react-router-dom'
import Navbar from './components/Navbar';
import PerfTable from './components/PerfTable'
import aircraftBasicInfo from './data/aircraftBasicInfo';

function App() {

// You can put functions and stuff here
  const [aircrafts, createAircraft] = useState(aircraftBasicInfo)

  return (
    <Router>
      <Navbar />
      <div className="flex flex-row">
        <div className="basis-1/3">
        <PerfTable aircrafts={aircrafts} />
        </div>
      </div>
      
      
      <main>Content</main>
    </Router>
  
  );
}

export default App;
