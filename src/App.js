import {BrowserRouter as Router, Route} from 'react-router-dom'
import Navbar from './components/Navbar';
import Perftable from './components/Perftable'

function App() {
  return (
    <Router>
      <Navbar />
      <div className="flex flex-row">
        <div className="basis-1/3">
        <Perftable />
        </div>
      </div>
      
      
      <main>Content</main>
    </Router>
  
  );
}

export default App;
