import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/pages/Home'
import AboutPage from './components/pages/AboutPage'
import PerfTable from './components/PerfTable'
// import aircraftBasicInfo from './data/aircraftBasicInfo'
import { AppContextProvider } from './context/AppContext'
import WeightAndBalance from './components/pages/WeightAndBalance'

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
          {/* <main className='container mx-auto px-3 pb-12'> */}
          <div className='basis-1/4'></div>
          <div className='basis-1/2 justify-center align-center'>
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route path='/wnb' element={<WeightAndBalance />} />
              <Route path='/about' element={<AboutPage />} />
            </Routes>
          </div>
          <div className='basis-1/4'></div>
          {/* </main> */}
        </div>
      </Router>
    </AppContextProvider>
  )
}

export default App
