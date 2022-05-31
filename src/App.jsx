import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/pages/Home'
import AboutPage from './components/pages/AboutPage'
import WeightAndBalance from './components/pages/WeightAndBalance'
import OperationalFlightPlan from './components/pages/OperationalFlightPlan'
import { AppContextProvider } from './context/AppContext'
import BasicData from './components/pages/BasicData'
import Weather from './components/pages/Weather'

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
							<Route exact path='/' element={<Home />} />
							<Route path='/basicdata' element={<BasicData />} />
							<Route path='/weather' element={<Weather />} />
							<Route path='/wnb' element={<WeightAndBalance />} />
							<Route path='/ofp' element={<OperationalFlightPlan />} />
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
