import { useEffect, useState, useContext } from 'react'
import AppContext from '../context/AppContext'

function FetchMetar() {
  // const path = 'https://api.met.no/weatherapi/tafmetar/1.0/metar.xml?icao=EFPO'
  const { route, setRoute } = useContext(AppContext)

  const path =
    'https://opendata.fmi.fi/wfs?request=GetFeature&storedquery_id=GetDataSetById&datasetid=1000578'

  const [xmlData, setXmlData] = useState([])

  useEffect(() => {
    fetchMet()
  }, [])

  const fetchMet = async () => {
    const response = await fetch(path)
    const data = await response.text()
    const parser = new DOMParser()
    const xmlDoc = parser.parseFromString(data, 'text/xml')

    const arr = []

    const airfields = xmlDoc.querySelectorAll('input')
    airfields.forEach((field) => {
      arr.push(field.textContent)
    })

    // XML has two recent metars. To get the latest, let's just use the latter half of the array.
    setXmlData(arr.slice(22, 44))
  }

  return (
    <>
      {xmlData.map((item) => {
        return <div key={item.slice(6, 10)}>{item}</div>
      })}
    </>
  )
}

export default FetchMetar
