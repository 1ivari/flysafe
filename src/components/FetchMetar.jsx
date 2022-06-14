import { useEffect, useState, useContext } from 'react'
import AppContext from '../context/AppContext'

function FetchMetar() {
  // const path = 'https://api.met.no/weatherapi/tafmetar/1.0/metar.xml?icao=EFPO'
  const { route, setRoute } = useContext(AppContext)

  const path =
    'https://opendata.fmi.fi/wfs?request=GetFeature&storedquery_id=GetDataSetById&datasetid=1000578'

  const [metarData, setMetarData] = useState([])

  useEffect(() => {
    fetchMet()
  }, [])

  const fetchMet = async () => {
    const response = await fetch(path)
    const data = await response.text()
    const parser = new DOMParser()
    const xmlDoc = parser.parseFromString(data, 'text/xml')

    const arr = []
    const weather_array = []

    const airfields = xmlDoc.querySelectorAll('input')
    airfields.forEach((field) => {
      arr.push(field.textContent)
    })

    // XML has two recent metars. To get the latest, let's just use the latter half of the array. slice(22,44)
    route.forEach((ap) => {
      arr.slice(22, 44).forEach((metar, idx) => {
        if (metar.slice(6, 10) === ap.ident) {
          weather_array.push(metar)
        }
      })
    })

    setMetarData(weather_array)
  }

  return (
    <>
      <ul>
        {metarData.map((item) => {
          return (
            <li
              key={item.slice(6, 10)}
              className='text-slate-600 text-white p-2'
            >
              {item}
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default FetchMetar
