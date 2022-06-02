import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'

// Import pages
import HomePage from './components/pages/HomePage'
import AboutPage from './components/pages/AboutPage'
import WeightAndBalancePage from './components/pages/WeightAndBalancePage'
import OperationalFlightPlanPage from './components/pages/OperationalFlightPlanPage'
import { AppContextProvider } from './context/AppContext'
import BasicDataPage from './components/pages/BasicDataPage'
import WeatherPage from './components/pages/WeatherPage'

function App() {
	// TODO:
	// Add routes. Välilehdille hyvä käyttää NavLink, tällä saa esim aktiivisen välilehden helposti highlightattua CSS tyyleillä
	// routesissa myös useNavigate jos pitää ensin suorittaa joku funktio ja sen jälkeen osoittaa uudelle sivulle.ks. lec 29
	// const [aircrafts, createAircraft] = useState(aircraftBasicInfo)

	return (
		<AppContextProvider>
			<Router>
				<Navbar />
				<div className='flex flex-row m-20'>
					<div className=''></div>
					<div className=' justify-center align-center'>
						<Routes>
							<Route exact path='/' element={<HomePage />} />
							<Route path='/basicdata' element={<BasicDataPage />} />
							<Route path='/weather' element={<WeatherPage />} />
							<Route path='/wnb' element={<WeightAndBalancePage />} />
							<Route path='/ofp' element={<OperationalFlightPlanPage />} />
							<Route path='/about' element={<AboutPage />} />
						</Routes>
					</div>
					<div className=''></div>
				</div>
			</Router>
		</AppContextProvider>
	)
}

export default App
