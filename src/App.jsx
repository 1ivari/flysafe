import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'

// Import pages
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import WeightAndBalancePage from './pages/WeightAndBalancePage'
import OperationalFlightPlanPage from './pages/OperationalFlightPlanPage'
import { AppContextProvider } from './context/AppContext'
import BasicDataPage from './pages/BasicDataPage'
import WeatherPage from './pages/WeatherPage'
import RoutePage from './pages/RoutePage'

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
          <Route exact path='/' element={<HomePage />} />
          <Route path='/basicdata' element={<BasicDataPage />} />
          <Route path='/route' element={<RoutePage />} />
          <Route path='/weather' element={<WeatherPage />} />
          <Route path='/wnb' element={<WeightAndBalancePage />} />
          <Route path='/ofp' element={<OperationalFlightPlanPage />} />
          <Route path='/about' element={<AboutPage />} />
        </Routes>
      </Router>
    </AppContextProvider>
  )
}

export default App
