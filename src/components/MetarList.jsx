import { useContext } from 'react'
import AppContext from '../context/AppContext'

// crypto.randomUUID()
function MetarList() {
	const { route } = useContext(AppContext)

	return (
		<>
			{route.map((obj, idx) => {
				return (
					<div key={obj.key} className='text-white'>
						<h1>Airfield: {obj.geoJSON.properties.name}</h1>
						<ul>
							{obj.geoJSON.properties.metars.length > 0 ? (
								obj.geoJSON.properties.metars.map((metar, i) => {
									return (
										<li key={i} className='text-white'>
											{metar}
										</li>
									)
								})
							) : (
								<li>No Metars available for this airfield.</li>
							)}
						</ul>
						<div>---</div>
					</div>
				)
			})}
		</>
	)
}

export default MetarList
