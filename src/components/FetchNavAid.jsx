import { useEffect, useState } from 'react'

function FetchMetar() {
	// const path = 'https://api.met.no/weatherapi/tafmetar/1.0/metar.xml?icao=EFPO'

	const path =
		'https://www.ais.fi/application/files/8016/1406/9772/EF_VFRREP_22APR2021.gpx'

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

		const airfields = xmlDoc.querySelectorAll('name')
		airfields.forEach((field) => {
			arr.push(field.textContent)
			console.log(field.textContent)
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
