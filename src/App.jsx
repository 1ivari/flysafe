import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import AboutPage from './components/pages/AboutPage'
import PerfTable from './components/PerfTable'
// import aircraftBasicInfo from './data/aircraftBasicInfo'
import { AppContextProvider } from './context/AppContext'

function App() {
  // TODO:
  // Add routes. Välilehdille hyvä käyttää NavLink, tällä saa esim aktiivisen välilehden helposti highlightattua CSS tyyleillä
  // routesissa myös useNavigate jos pitää ensin suorittaa joku funktio ja sen jälkeen osoittaa uudelle sivulle.ks. lec 29
  // const [aircrafts, createAircraft] = useState(aircraftBasicInfo)

  return (
    <AppContextProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<PerfTable />} />
        </Routes>
        <Routes>
          <Route path='/about' element={<AboutPage />} />
        </Routes>
      </Router>
    </AppContextProvider>
  )
}

export default App
