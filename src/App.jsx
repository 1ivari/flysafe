import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from './components/Navbar'

// Import pages
import HomePage from './pages/Home/HomePage'
import AboutPage from './pages/Home/AboutPage'
import SignIn from './pages/Home/SignIn'
import SignUp from './pages/Home/SignUp'
import Profile from './pages/Home/Profile'
import WeightAndBalancePage from './pages/wnb/WeightAndBalancePage'
import OperationalFlightPlanPage from './pages/OFP/OperationalFlightPlanPage'
import { AppContextProvider } from './context/AppContext'
import BasicDataPage from './pages/BasicData/BasicDataPage'
import WeatherPage from './pages/Weather/WeatherPage'
import RoutePage from './pages/Route/RoutePage'

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
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/basicdata' element={<BasicDataPage />} />
          <Route path='/route' element={<RoutePage />} />
          <Route path='/weather' element={<WeatherPage />} />
          <Route path='/wnb' element={<WeightAndBalancePage />} />
          <Route path='/ofp' element={<OperationalFlightPlanPage />} />
          <Route path='/about' element={<AboutPage />} />
        </Routes>
      </Router>
      <ToastContainer />
    </AppContextProvider>
  )
}

export default App
